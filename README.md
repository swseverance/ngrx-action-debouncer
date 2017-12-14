# ngrx-action-debouncer
[![Build Status](https://travis-ci.org/swseverance/ngrx-action-debouncer.svg?branch=master)](https://travis-ci.org/swseverance/ngrx-action-debouncer)
>Debounce a stream of actions before being dispatched to the store.

This library is designed to work with **@ngrx/store** apps written with **Angular v5+**.

Get the [Changelog](https://github.com/swseverance/ngrx-action-debouncer/blob/master/CHANGELOG.md).

## API
The library provides an injectable `NgrxActionDebouncerService` with a single `debounceAction` method.
```typescript
public debounceAction <A extends Action>(action: A, dueTime: number = 0): void {
  ...
}
```
## How it works

Consider an application where a user enters text in an input, and receives search results in return. An implementation using **@ngrx/store** might result in the following actions being dispatched over time as a result of the user typing "ang".
```typescript
// 0ms
this.store.dispatch({
  type: 'SEARCH_ACTION',
  payload: 'a'
});

...

// 50ms after initial action
this.store.dispatch({
  type: 'SEARCH_ACTION',
  payload: 'an'
});

...

// 80ms after initial action
this.store.dispatch({
  type: 'SEARCH_ACTION',
  payload: 'ang'
});
```
`debounceAction()` creates and subscribes to an `Observable` **for each distinct type of action it is invoked with.** The Observable is debounced using the **RxJS** `debounceTime()` operator, with the specified due time. When the Observable finally emits the action is dispatched to the store.

**ngrx-action-debouncer** would view all of the above actions as belonging to the same stream of actions because their type is identical. Using `debounceAction()` with a due time of 75ms would result in only one of the three actions being dispatched to the store:
```typescript
// 0ms
//
// action is 'debounced' & not dispatched to the store
this.debouncer.debounceAction({
  type: 'SEARCH_ACTION',
  payload: 'a'
}, 75);

...

// 50ms after initial action
//
// action is 'debounced' & not dispatched to the store
this.debouncer.debounceAction({
  type: 'SEARCH_ACTION',
  payload: 'an'
}, 75);

...

// 80ms after initial action
//
// action IS dispatched to the store a total of 155ms after
// the initial action
this.debouncer.debounceAction({
  type: 'SEARCH_ACTION',
  payload: 'ang'
}, 75);
```
## Multiple Types of Actions

Because each type of action receives its own Observable, `debounceAction()` can safely be used with multiple types of actions. See the library's unit tests for an example of why this works.

## Usage
Import `NgrxActionDebouncerModule` only once, into your app's root module:

```typescript
// app.module.ts

import { NgrxActionDebouncerModule } from 'ngrx-action-debouncer';

@NgModule({
  declarations: [
    AppComponent,
    SampleComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    NgrxActionDebouncerModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
```

Inject `NgrxActionDebouncerService` into Components, Services, etc. as needed:

```typescript
import { Component } from '@angular/core';

import { NgrxActionDebouncerService } from 'ngrx-action-debouncer';

@Component({
  selector: 'app-sample',
  template: `
    <button type="button" (click)="onClick()">
      Increment
    </button>
  `
})
export class SampleComponent {
  constructor (private debouncer: NgrxActionDebouncerService) { }

  onClick () {
    const action = {
      type: 'INCREMENT'
    };

    // 500ms
    const dueTime = 500;

    this.debouncer.debounceAction(action, dueTime);
  }
}
```

## Installation, Loading & Compilation
### Installing
```shell
npm install ngrx-action-debouncer --save
```
### Loading
#### Using SystemJS configuration
```typescript
System.config({
  map: {
    'ngrx-action-debouncer': 'node_modules/ngrx-action-debouncer/bundles/ngrx-action-debouncer.umd.js'
  }
});
```

### AoT compilation
The library is compatible with _AoT compilation_.

## License
MIT

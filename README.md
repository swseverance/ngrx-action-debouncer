# ngrx-action-debouncer
[![Build Status](https://travis-ci.org/swseverance/ngrx-action-debouncer.svg?branch=master)](https://travis-ci.org/swseverance/ngrx-action-debouncer)
>Debounce a stream of actions before being dispatched to the store.

This library is designed to work with **@ngrx/store** apps written with **Angular v5+**.

Get the [Changelog](https://github.com/swseverance/ngrx-action-debouncer/blob/master/CHANGELOG.md).

## API
The library provides an injectable `NgrxActionDebouncerService` with a single `debounceAction` method.
```TypeScript
  public debounceAction <A extends Action>(action: A, dueTime: number = 0): void {
    ...
  }
```
## How it works

TODO

## Usage
Import `NgrxActionDebouncerModule` only once, into your app's root module:

```TypeScript
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

```TypeScript
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
```Shell
npm install ngrx-action-debouncer --save
```
### Loading
#### Using SystemJS configuration
```TypeScript
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

import { Injectable, Inject } from '@angular/core';

import { Action, Store } from '@ngrx/store';

import { TIMER_MAP } from './timer-map';

@Injectable()
export class NgrxActionDebouncerService {
  constructor(
    @Inject(Store) private store: Store<any>,
    @Inject(TIMER_MAP) private timerMap
  ) {}

  debounceAction<A extends Action>(action: A, dueTime: number = 0): void {
    const { type } = action;

    if (this.hasExistingTimer(type)) {
      this.killExistingTimer(type);
    }

    this.startTimer(action, dueTime);
  }

  private hasExistingTimer(type: string) {
    return this.timerMap.has(type);
  }

  private killExistingTimer(type: string) {
    const timer = this.getTimer(type);
    window.clearTimeout(timer);
  }

  private getTimer(type: string) {
    return this.timerMap.get(type);
  }

  private startTimer<A extends Action>(action: A, dueTime: number) {
    const timer = setTimeout(() => {
      this.store.dispatch(action);
      this.timerMap.delete(action.type);
    }, dueTime);

    this.setTimer(action.type, timer);
  }

  private setTimer(type: string, timer: any) {
    this.timerMap.set(type, timer);
  }
}

import { NgModule, ModuleWithProviders } from '@angular/core';

import {
  NgrxActionDebouncerService,
  TIMER_MAP,
  timerMapFactory
} from '../services/index';

@NgModule({
  providers: [
    NgrxActionDebouncerService,
    {
      provide: TIMER_MAP,
      useFactory: timerMapFactory
    }
  ]
})
export class NgrxActionDebouncerModule {}

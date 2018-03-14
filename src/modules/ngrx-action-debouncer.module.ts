import { NgModule, ModuleWithProviders } from '@angular/core';

import {
  NgrxActionDebouncerService,
  SUBJECT_MAP,
  subjectMapFactory
} from '../services/index';

@NgModule({
  providers: [
    NgrxActionDebouncerService,
    {
      provide: SUBJECT_MAP,
      useFactory: subjectMapFactory
    }
  ]
})
export class NgrxActionDebouncerModule {}

import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgrxActionDebouncerService } from '../services/ngrx-action-debouncer.service';
import { SUBJECT_MAP_PROVIDER } from '../services/subject-map';

@NgModule({
  providers: [
    NgrxActionDebouncerService,
    SUBJECT_MAP_PROVIDER
  ]
})
export class NgrxActionDebouncerModule { }

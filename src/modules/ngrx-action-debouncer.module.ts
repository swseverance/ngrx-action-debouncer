import { NgModule, ModuleWithProviders } from '@angular/core';

import {
  NgrxActionDebouncerService,
  SUBJECT_MAP_PROVIDER
} from '../services/index';

@NgModule({
  providers: [NgrxActionDebouncerService, SUBJECT_MAP_PROVIDER]
})
export class NgrxActionDebouncerModule {}

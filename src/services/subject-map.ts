import { ClassProvider, InjectionToken } from '@angular/core';

import { Action } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

export type SubjectMap = Map<string, Subject<Action>>;

export const SUBJECT_MAP = new InjectionToken<SubjectMap>('SubjectMap');

export const SUBJECT_MAP_PROVIDER: ClassProvider = {
  provide: SUBJECT_MAP,
  useClass: Map
};

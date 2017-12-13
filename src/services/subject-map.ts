import {
  ClassProvider
} from '@angular/core';

import {
  Subject
} from 'rxjs/Subject';

export abstract class SubjectMap extends Map<string, Subject<any>> { }

export const SUBJECT_MAP_PROVIDER: ClassProvider = {
  provide: SubjectMap,
  useClass: Map
};

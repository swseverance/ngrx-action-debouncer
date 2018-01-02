import { ValueProvider } from '@angular/core';

import { Subject } from 'rxjs/Subject';

export abstract class SubjectMap extends Map<string, Subject<any>> {}

export const SUBJECT_MAP_PROVIDER: ValueProvider = {
  provide: SubjectMap,
  useValue: new Map()
};

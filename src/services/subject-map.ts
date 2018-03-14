import { InjectionToken } from '@angular/core';

import { Subject } from 'rxjs/Subject';

export const SUBJECT_MAP = new InjectionToken<Map<string, Subject<any>>>(
  'SubjectMap'
);

export const subjectMapFactory = function() {
  return new Map();
};

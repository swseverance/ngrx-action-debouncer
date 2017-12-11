import { Injectable, Inject } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/first';

import { SUBJECT_MAP, SubjectMap } from './subject-map';

@Injectable()
export class NgrxActionDebouncerService {
  constructor(
    @Inject(Store) private store: Store<any>,
    @Inject(SUBJECT_MAP) private subjectMap: SubjectMap) { }

  public debounceAction (action: Action, dueTime: number = 0): void {
    const { type } = action;

    if (!this.subjectMap.has(type)) {
      const subject = new Subject<Action>();
      const next = (action: Action) => this.store.dispatch(action);
      const complete = () => this.subjectMap.delete(type);

      subject
        .asObservable()
        .debounceTime(dueTime)
        .first()
        .subscribe({ next, complete });

      this.subjectMap.set(type, subject);
    }

    this.subjectMap.get(type).next(action);
  }
}

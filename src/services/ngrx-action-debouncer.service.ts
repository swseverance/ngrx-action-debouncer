import { Injectable, Inject } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/first';

import { SubjectMap } from './subject-map';

@Injectable()
export class NgrxActionDebouncerService {
  constructor(
    @Inject(Store) private store: Store<any>,
    private subjectMap: SubjectMap
  ) {}

  public debounceAction<A extends Action>(
    action: A,
    dueTime: number = 0
  ): void {
    const { type } = action;

    if (!this.subjectMap.has(type)) {
      const subject = new Subject<A>();
      const next = (action: A) => this.store.dispatch(action);
      const complete = () => this.subjectMap.delete(type);

      subject
        .asObservable()
        .debounceTime(dueTime)
        .first()
        .subscribe({ next, complete });

      this.subjectMap.set(type, subject);
    }

    const subject = this.subjectMap.get(type);

    if (subject) {
      subject.next(action);
    }
  }
}

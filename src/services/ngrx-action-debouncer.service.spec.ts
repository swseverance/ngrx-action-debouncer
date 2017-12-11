import {
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  Action,
  Store
} from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

import {
  NgrxActionDebouncerService,
  SubjectMap,
  SUBJECT_MAP,
  SUBJECT_MAP_PROVIDER
} from './';

let service: NgrxActionDebouncerService;
let subjectMap: Map<string, Subject<Action>>;
let store: Store<any>;
let spy: jasmine.Spy;

describe('NgrxActionDebouncerService', () => {
  beforeEach(setupTest);

  it('should debounce a stream of actions', fakeAsync(() => {
    /**
     * -A-B---C
     *   debounce SELECT_DATE actions by 300ms
     * ------B---C
     */
    const mockActionA = { type: 'SELECT_DATE', payload: '2017-01-01' };
    const mockActionB = { type: 'SELECT_DATE', payload: '2017-01-02' };
    const mockActionC = { type: 'SELECT_DATE', payload: '2017-01-03' };

    tick(100);  // 100ms
    service.debounceAction(mockActionA, 300);

    tick(100);  // 200ms
    expect(spy).not.toHaveBeenCalled();

    tick(100);  // 300ms
    service.debounceAction(mockActionB, 300);

    tick(100);  // 400ms
    expect(spy).not.toHaveBeenCalled();

    tick(100);  // 500ms
    expect(spy).not.toHaveBeenCalled();

    tick(100);  // 600ms
    expect(spy).toHaveBeenCalledWith(mockActionB);

    tick(100);  // 700ms
    service.debounceAction(mockActionC, 300);

    tick(100);  // 800ms
    expect(spy.calls.count()).toBe(1);

    tick(100);  // 900ms
    expect(spy.calls.count()).toBe(1);

    tick(100);  // 1000ms
    expect(spy).toHaveBeenCalledWith(mockActionC);
    expect(spy.calls.count()).toBe(2);
  }));

  it('should clean up after dispatching an action', fakeAsync(() => {
    const mockAction = { type: 'SELECT_DATE', payload: '2017-01-01' };

    tick(100);  // 100ms
    service.debounceAction(mockAction, 100);

    tick(50);  // 150ms
    expect(subjectMap.size).toBe(1);

    tick(50);  // 200ms
    expect(spy).toHaveBeenCalledWith(mockAction);
    expect(subjectMap.size).toBe(0);
  }));

  it('should handle multiple types of actions simultaneously', fakeAsync(() => {
    /**
     * -A-C-B-D
     *   debounce SELECT_DATE actions by 500ms, SELECT_USER actions by 1000ms
     * ----------B------D
     */
    const mockActionA = { type: 'SELECT_DATE', payload: '2017-01-01' };
    const mockActionB = { type: 'SELECT_DATE', payload: '2017-01-02' };
    const mockActionC = { type: 'SELECT_USER', payload: 1 };
    const mockActionD = { type: 'SELECT_USER', payload: 2 };

    tick(100);  // 100ms
    service.debounceAction(mockActionA, 500);

    tick(100);  // 200ms

    tick(100);  // 300ms
    service.debounceAction(mockActionC, 1000);

    tick(100);  // 400ms

    tick(100);  // 500ms
    service.debounceAction(mockActionB, 500);

    tick(100);  // 600ms

    tick(100);  // 700ms
    service.debounceAction(mockActionD, 1000);

    tick(100); // 800ms
    expect(spy).not.toHaveBeenCalled();

    tick(100); // 900ms
    expect(spy).not.toHaveBeenCalled();

    tick(100); // 1000ms
    expect(spy).toHaveBeenCalledWith(mockActionB);

    tick(700); // 1700ms
    expect(spy).toHaveBeenCalledWith(mockActionD);
    expect(spy.calls.count()).toBe(2);
  }));
});

function setupTest () {
  TestBed.configureTestingModule({
    providers: [
      NgrxActionDebouncerService,
      SUBJECT_MAP_PROVIDER,
      {
        provide: Store,
        useValue: {
          dispatch: () => { }
        }
      }
    ]
  });

  service = TestBed.get(NgrxActionDebouncerService);
  subjectMap = TestBed.get(SUBJECT_MAP);
  store = TestBed.get(Store);
  spy = spyOn(store, 'dispatch');
}

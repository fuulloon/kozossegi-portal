import { BehaviorSubject, Observable, Subject } from 'rxjs';

export class Store<T> {
  private state$$: BehaviorSubject<T>;
  readonly state$: Observable<T>;
  protected readonly destroy$$: Subject<void>;

  public constructor(initialstate: T) {
    console.log('store init' + typeof initialstate);
    this.state$$ = new BehaviorSubject<T>(initialstate);
    this.destroy$$ = new Subject<void>();
    this.state$ = this.state$$.asObservable();
  }

  protected get state(): T {
    return this.state$$.getValue();
  }

  protected getState$(): Observable<T> {
    return this.state$;
  }

  protected setState(value: T): void {
    this.state$$.next(value);
  }



}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private isSpinnerVisibleSubject: BehaviorSubject<boolean>;
  public isSpinnerVisible: Observable<boolean>;

  constructor() { 
    this.isSpinnerVisibleSubject = new BehaviorSubject<boolean>(false);
    this.isSpinnerVisible = this.isSpinnerVisibleSubject.asObservable();
  }

  public get isSpinnerVisiblerValue() {
    return this.isSpinnerVisibleSubject.value;
  }

  showSpinner() {
    this.isSpinnerVisibleSubject.next(true);
  }

  hideSpinner() {
    this.isSpinnerVisibleSubject.next(false);
  }
}

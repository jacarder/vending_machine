import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PowerService {

  private _isMachineOn = new BehaviorSubject(true);
  isMachineOn$ = this._isMachineOn.asObservable();

  constructor() { }

  setIsMachineOn = (value: boolean): void => {
    this._isMachineOn.next(value);
  }
}

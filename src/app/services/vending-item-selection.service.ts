import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Inventory, VendingItem } from '../models';
import { clone } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class VendingItemSelectionService {
  private _currentItem = new BehaviorSubject<VendingItem | null>(null);
  private _tray = new BehaviorSubject<Inventory>(new Inventory([]));
  currentItem$ = this._currentItem.asObservable();
  tray$ = this._tray.asObservable();

  constructor() { }
  setCurrentItem = (value: VendingItem): void => {
    this._currentItem.next(value);
  }

  addItemToTray = (item: VendingItem): void => {
    let currentTray = this._tray.value;
    let sameItem = currentTray.items.find((trayItem) => trayItem.id === item.id);
    if(item.quantity !== 0) {
      if(sameItem) {
        sameItem.quantity++;      
      } else {
        let newTrayItem = clone(item);
        newTrayItem.quantity = 1;
        currentTray.items.push(newTrayItem);
      }
      item.removeItemQuantity();
  
      this._tray.next(currentTray);
    }
  }
}

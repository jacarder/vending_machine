import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Inventory, VendingItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VendingMachineService {

  private _baseApi = 'local:9999/api/';
  private _paymentAttemptCount: number = 0;
  get paymentAttemptCount() {
    return this._paymentAttemptCount;
  }
  constructor(
    private httpClient: HttpClient
  ) { }

  getVendingItems = (): Observable<Inventory> => {
    //  Mock api
    return of(new Array(
      new VendingItem(1, "Cookie", 1.35, 2),
      new VendingItem(2, "Gum", 2.25, 4),
      new VendingItem(3, "Chocolate", 3.50, 3),
    )).pipe(
      switchMap(
        (items: VendingItem[]) => of(new Inventory(items))
      ),
      take(1)
    )
  }
  // TODO 
  addVendingItem = (item: VendingItem): Observable<unknown> => {
    return this.httpClient.post(`${this._baseApi}addItem`, item);
  }

  resetPaymentAttamptCount = ():void => {
    this._paymentAttemptCount = 0;
  }

  addOnePaymentAttemptCount = (): void => {
    this._paymentAttemptCount++;
  }
}

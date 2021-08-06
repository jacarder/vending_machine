import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Inventory, LED_MESSAGE, VendingItem } from './models';
import { PowerService } from './services/power.service';
import { VendingItemSelectionService } from './services/vending-item-selection.service';
import { VendingMachineService } from './services/vending-machine.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy, OnChanges {
  hasInventory: boolean = false;
  paymentFailed: boolean = false;
  vendingInventory$: Observable<Inventory> = this.vendingMachineService.getVendingItems();
  power$: Observable<boolean> = this.powerService.isMachineOn$.pipe(shareReplay({refCount: true, bufferSize: 1}))
  selectedItem: VendingItem;
  subscription: Subscription = new Subscription();
  messages: typeof LED_MESSAGE = LED_MESSAGE;

  constructor(
    private vendingMachineService: VendingMachineService,
    private vendingItemSelectionService: VendingItemSelectionService,
    private powerService: PowerService,
    private currencyPipe: CurrencyPipe
  ) {

  }
  ngOnInit(): void {
    this.subscription.add(
      this.vendingInventory$.subscribe(
        (inv: Inventory) => {
          this.hasInventory = !inv.inventoryEmpty();
        },
        (error) => {
          //  handle error logic
        }
      )
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  getFirstDisplayMessage = (power: boolean) => {
    if(power) {
      const attempts = this.vendingMachineService.paymentAttemptCount;
      //  If user made a selection then show if payment failed or not else show welcome message
      if(attempts > 0) {
        return this.messages.CONTINUE;
      }
      return this.messages.WELCOME 
    }
    return ''
  }

  getSecondDisplayMessage = (power: boolean, selectedItem?: VendingItem, paymentSuccessful?: boolean) => {
    if(power) {
      const attempts = this.vendingMachineService.paymentAttemptCount;
      //  The user hasen't made a selection and no product is selected yet
      if(attempts === 0 && !selectedItem) {
        return this.hasInventory ? this.messages.SELECT_PRODUCT : this.messages.SOLD_OUT;
      }
      //  If no payment attempt, but selecting items
      if(attempts === 0 && selectedItem) {
        const itemPrice = this.currencyPipe.transform(selectedItem.price);
        const itemMessage = `${selectedItem.displayName} ${itemPrice} - ${selectedItem.quantity} Left`
        return selectedItem.quantity >= 1 ? itemMessage : `${itemMessage} - Sold Out` 
      }
      //  If made a selection and payment
      if(attempts >= 1 && selectedItem) {
        return paymentSuccessful ? this.messages.TAKE_PRODUCT : this.messages.PAYMENT_FAIL;
      }
      return this.messages.WELCOME 
    }
    return ''
  }

  addItemToTray = (paymentSuccessful: boolean, item: VendingItem) => {
    if(paymentSuccessful) {
      this.vendingItemSelectionService.addItemToTray(item);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}




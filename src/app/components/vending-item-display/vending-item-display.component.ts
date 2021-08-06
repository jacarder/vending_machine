import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardReaderRequest, Inventory, VendingItem } from 'src/app/models';
import { CardReaderService } from 'src/app/services/card-reader.service';
import { VendingMachineService } from 'src/app/services/vending-machine.service';


@Component({
  selector: 'vending-item-display[inventory]',
  templateUrl: './vending-item-display.component.html',
  styleUrls: ['./vending-item-display.component.scss']
})
export class VendingItemDisplayComponent implements OnInit {
  @Input() inventory: Inventory;
  private _selectedItem: VendingItem
  @Input() set selectedItem(value: VendingItem) {
    this._selectedItem = value;
    this.selectedItemChange.emit(value);
  };
  get selectedItem() {
    return this._selectedItem;
  }
  @Output() selectedItemChange: EventEmitter<VendingItem> = new EventEmitter<VendingItem>();
  @Output() paymentSuccessful: EventEmitter<boolean> = new EventEmitter<boolean>();
  cardReaderRequest: CardReaderRequest;
  subscriptions: Subscription = new Subscription();
  constructor(
    private vendingMachineService: VendingMachineService,
    private cardReaderService: CardReaderService
  ) { }

  ngOnInit(): void {
    if(!this.selectedItem) {
      this.selectedItem = this.inventory.items[0];
    }
  }

  forward = () => {
    const currentIndex = this.inventory.items.indexOf(this.selectedItem);
    const nextIndex = this.inventory.items.length-1 === currentIndex ? 0 : currentIndex + 1;
    this.selectedItemChange.emit(this.inventory.items[nextIndex])
  }

  backward = () => {
    const currentIndex = this.inventory.items.indexOf(this.selectedItem);
    const nextIndex = 0 === currentIndex ? this.inventory.items.length-1 : currentIndex - 1;
    this.selectedItemChange.emit(this.inventory.items[nextIndex]);
  }

  payForItem = () => {
    this.vendingMachineService.addOnePaymentAttemptCount();
    this.subscriptions.add(
      this.cardReaderService.readCard(this.cardReaderRequest).subscribe(
        () => {
          this.paymentSuccessful.emit(true);
        },
        (error) => {
          this.paymentSuccessful.emit(false);
        }
      )
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

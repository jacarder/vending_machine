import { Directive, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { VendingMachineService } from '../services/vending-machine.service';

@Directive({
  selector: '[reset]'
})
export class ResetDirective {

  subscriptions = new Subscription();
  //  DOES NOT WORK
  @HostListener('click', ['$event'])
    onClick(e: any) {
      if(this.vendingMachineService.paymentAttemptCount > 0 ) {
        e.stopPropagation();
        e.preventDefault();
        this.vendingMachineService.resetPaymentAttamptCount();
      }  
  }

  constructor(
    private vendingMachineService: VendingMachineService
  ) {

  }
}

import { Component, OnInit } from '@angular/core';
import { VendingItemSelectionService } from 'src/app/services/vending-item-selection.service';

@Component({
  selector: 'vending-tray',
  templateUrl: './vending-tray.component.html',
  styleUrls: ['./vending-tray.component.scss']
})
export class VendingTrayComponent implements OnInit {
  tray$ = this.vendingItemSelectionService.tray$;

  constructor(
    private vendingItemSelectionService: VendingItemSelectionService
  ) { }

  ngOnInit(): void {
    
  }

}

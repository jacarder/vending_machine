import { Component, Input, OnInit } from '@angular/core';
import { VendingItem } from 'src/app/models';

@Component({
  selector: 'led-display[message]',
  templateUrl: './led-display.component.html',
  styleUrls: ['./led-display.component.scss']
})
export class LedDisplayComponent implements OnInit {

  @Input() message: string;
  @Input() product: VendingItem;

  constructor() { }

  ngOnInit(): void {
    
  }

}

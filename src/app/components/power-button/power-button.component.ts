import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PowerService } from 'src/app/services/power.service';

@Component({
  selector: 'power-button',
  templateUrl: './power-button.component.html',
  styleUrls: ['./power-button.component.scss']
})
export class PowerButtonComponent implements OnInit, OnDestroy {
  power: boolean;
  subscriptons: Subscription = new Subscription();
  constructor(
    public powerService: PowerService 
  ) { }

  ngOnInit(): void {
    this.subscriptons.add(
      this.powerService.isMachineOn$.subscribe(
        (isMachineOn) => {
          this.power = isMachineOn;
        }
      )
    )
  }

  ngOnDestroy(): void {
    this.subscriptons.unsubscribe();
  }

}

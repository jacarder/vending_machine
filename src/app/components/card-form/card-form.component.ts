import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CardReaderRequest } from 'src/app/models';


@Component({
  selector: 'card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit {

  @Output() cardReaderRequest: EventEmitter<CardReaderRequest> = new EventEmitter<CardReaderRequest>();

  cardForm: FormGroup;
  subscriptions: Subscription = new Subscription();

  get cardNumber() {
    return this.cardForm.get('cardNumber')
  }

  get expirationDate() {
    return this.cardForm.get('expirationDate')
  }

  get securityCode() {
    return this.cardForm.get('securityCode')
  }

  constructor() { }

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      cardNumber: new FormControl('', [Validators.minLength(14), Validators.maxLength(19), Validators.required]),
      expirationDate: new FormControl(new Date(), [Validators.required]),
      securityCode: new FormControl('', [Validators.minLength(3), Validators.maxLength(3), Validators.required])
    })
    this.subscriptions.add(
      this.cardForm.valueChanges.subscribe(
        (value) => {
          if(this.cardForm.valid) {
            const cardRequest: CardReaderRequest = {
              cardNumber: this.cardNumber?.value,
              expirationDate: this.expirationDate?.value,
              securityCode: this.securityCode?.value
            }
            this.cardReaderRequest.emit(cardRequest);
          }
        }
      )
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

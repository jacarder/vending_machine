import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { AppComponent } from './app.component';
import { LedDisplayComponent } from './components/led-display/led-display.component';
import { VendingTrayComponent } from './components/vending-tray/vending-tray.component';
import { VendingItemDisplayComponent } from './components/vending-item-display/vending-item-display.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PowerButtonComponent } from './components/power-button/power-button.component';
import { CurrencyPipe } from '@angular/common';
import { ResetDirective } from './directives/reset.directive';
import { CardFormComponent } from './components/card-form/card-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LedDisplayComponent,
    VendingTrayComponent,
    VendingItemDisplayComponent,
    PowerButtonComponent,
    ResetDirective,
    CardFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

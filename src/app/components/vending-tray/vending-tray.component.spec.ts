import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendingTrayComponent } from './vending-tray.component';

describe('VendingTrayComponent', () => {
  let component: VendingTrayComponent;
  let fixture: ComponentFixture<VendingTrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendingTrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendingTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

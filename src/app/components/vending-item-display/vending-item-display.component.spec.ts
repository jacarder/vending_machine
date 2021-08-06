import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendingItemDisplayComponent } from './vending-item-display.component';

describe('VendingItemDisplayComponent', () => {
  let component: VendingItemDisplayComponent;
  let fixture: ComponentFixture<VendingItemDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendingItemDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendingItemDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendingItemComponent } from './vending-item.component';

describe('VendingItemComponent', () => {
  let component: VendingItemComponent;
  let fixture: ComponentFixture<VendingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendingItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

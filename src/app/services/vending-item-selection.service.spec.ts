import { TestBed } from '@angular/core/testing';

import { VendingItemSelectionService } from './vending-item-selection.service';

describe('VendingItemSelectionService', () => {
  let service: VendingItemSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendingItemSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

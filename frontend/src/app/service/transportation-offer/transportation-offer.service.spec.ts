import { TestBed } from '@angular/core/testing';

import { TransportationOfferService } from './transportation-offer.service';

describe('TransportationOfferService', () => {
  let service: TransportationOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportationOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

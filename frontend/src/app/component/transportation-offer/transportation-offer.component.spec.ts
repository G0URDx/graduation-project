import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationOfferComponent } from './transportation-offer.component';

describe('TransportationOfferComponent', () => {
  let component: TransportationOfferComponent;
  let fixture: ComponentFixture<TransportationOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransportationOfferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransportationOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

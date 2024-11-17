import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationOfferHomeComponent } from './transportation-offer-home.component';

describe('TransportationOfferHomeComponent', () => {
  let component: TransportationOfferHomeComponent;
  let fixture: ComponentFixture<TransportationOfferHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportationOfferHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransportationOfferHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

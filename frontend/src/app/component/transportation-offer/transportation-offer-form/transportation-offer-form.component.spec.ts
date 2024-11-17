import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationOfferFormComponent } from './transportation-offer-form.component';

describe('TransportationOfferFormComponent', () => {
  let component: TransportationOfferFormComponent;
  let fixture: ComponentFixture<TransportationOfferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportationOfferFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransportationOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

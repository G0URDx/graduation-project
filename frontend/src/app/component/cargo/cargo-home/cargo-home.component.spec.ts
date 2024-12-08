import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoHomeComponent } from './cargo-home.component';

describe('CargoHomeComponent', () => {
  let component: CargoHomeComponent;
  let fixture: ComponentFixture<CargoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargoHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomsHomeComponent } from './customs-home.component';

describe('CustomsHomeComponent', () => {
  let component: CustomsHomeComponent;
  let fixture: ComponentFixture<CustomsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomsHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

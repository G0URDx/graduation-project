import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomsFormComponent } from './customs-form.component';

describe('CustomsFormComponent', () => {
  let component: CustomsFormComponent;
  let fixture: ComponentFixture<CustomsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

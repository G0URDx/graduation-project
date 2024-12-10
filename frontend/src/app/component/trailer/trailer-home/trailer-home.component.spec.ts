import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerHomeComponent } from './trailer-home.component';

describe('TrailerHomeComponent', () => {
  let component: TrailerHomeComponent;
  let fixture: ComponentFixture<TrailerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailerHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrailerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

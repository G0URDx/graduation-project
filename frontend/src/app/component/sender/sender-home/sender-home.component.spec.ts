import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderHomeComponent } from './sender-home.component';

describe('SenderHomeComponent', () => {
  let component: SenderHomeComponent;
  let fixture: ComponentFixture<SenderHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SenderHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SenderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

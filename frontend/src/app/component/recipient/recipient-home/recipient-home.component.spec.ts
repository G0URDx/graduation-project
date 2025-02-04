import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientHomeComponent } from './recipient-home.component';

describe('RecipientHomeComponent', () => {
  let component: RecipientHomeComponent;
  let fixture: ComponentFixture<RecipientHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipientHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipientHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

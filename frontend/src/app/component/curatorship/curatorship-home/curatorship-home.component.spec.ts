import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuratorshipHomeComponent } from './curatorship-home.component';

describe('CuratorshipHomeComponent', () => {
  let component: CuratorshipHomeComponent;
  let fixture: ComponentFixture<CuratorshipHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuratorshipHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuratorshipHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

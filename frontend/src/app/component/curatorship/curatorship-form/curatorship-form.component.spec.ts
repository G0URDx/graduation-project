import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuratorshipFormComponent } from './curatorship-form.component';

describe('CuratorshipFormComponent', () => {
  let component: CuratorshipFormComponent;
  let fixture: ComponentFixture<CuratorshipFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuratorshipFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuratorshipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietPlansComponent } from './diet-plans.component';

describe('DietPlansComponent', () => {
  let component: DietPlansComponent;
  let fixture: ComponentFixture<DietPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DietPlansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DietPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

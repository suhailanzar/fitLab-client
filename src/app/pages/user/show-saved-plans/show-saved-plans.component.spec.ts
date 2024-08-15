import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSavedPlansComponent } from './show-saved-plans.component';

describe('ShowSavedPlansComponent', () => {
  let component: ShowSavedPlansComponent;
  let fixture: ComponentFixture<ShowSavedPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowSavedPlansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowSavedPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

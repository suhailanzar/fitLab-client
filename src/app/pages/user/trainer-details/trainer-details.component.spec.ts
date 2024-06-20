import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerDetailsComponent } from './trainer-details.component';

describe('TrainerDetailsComponent', () => {
  let component: TrainerDetailsComponent;
  let fixture: ComponentFixture<TrainerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainerDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

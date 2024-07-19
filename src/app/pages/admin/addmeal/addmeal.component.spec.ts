import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmealComponent } from './addmeal.component';

describe('AddmealComponent', () => {
  let component: AddmealComponent;
  let fixture: ComponentFixture<AddmealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddmealComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddmealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

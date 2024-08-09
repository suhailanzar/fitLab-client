import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursedetailsAdminComponent } from './coursedetails-admin.component';

describe('CoursedetailsAdminComponent', () => {
  let component: CoursedetailsAdminComponent;
  let fixture: ComponentFixture<CoursedetailsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursedetailsAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursedetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

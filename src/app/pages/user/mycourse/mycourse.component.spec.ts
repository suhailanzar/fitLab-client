import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycourseComponent } from './mycourse.component';

describe('MycourseComponent', () => {
  let component: MycourseComponent;
  let fixture: ComponentFixture<MycourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MycourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

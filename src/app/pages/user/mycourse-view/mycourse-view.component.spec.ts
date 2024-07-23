import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycourseViewComponent } from './mycourse-view.component';

describe('MycourseViewComponent', () => {
  let component: MycourseViewComponent;
  let fixture: ComponentFixture<MycourseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MycourseViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycourseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

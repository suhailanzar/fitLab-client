import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallUserComponent } from './video-call-user.component';

describe('VideoCallUserComponent', () => {
  let component: VideoCallUserComponent;
  let fixture: ComponentFixture<VideoCallUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoCallUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoCallUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

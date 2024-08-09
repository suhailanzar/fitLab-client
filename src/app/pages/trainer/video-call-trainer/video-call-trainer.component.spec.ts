import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallTrainerComponent } from './video-call-trainer.component';

describe('VideoCallTrainerComponent', () => {
  let component: VideoCallTrainerComponent;
  let fixture: ComponentFixture<VideoCallTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoCallTrainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoCallTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineChatComponent } from './traine-chat.component';

describe('TraineChatComponent', () => {
  let component: TraineChatComponent;
  let fixture: ComponentFixture<TraineChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TraineChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TraineChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

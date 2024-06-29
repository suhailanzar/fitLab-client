import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserchatComponent } from './userchat.component';

describe('UserchatComponent', () => {
  let component: UserchatComponent;
  let fixture: ComponentFixture<UserchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserchatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpReuseComponent } from './otp-reuse.component';

describe('OtpReuseComponent', () => {
  let component: OtpReuseComponent;
  let fixture: ComponentFixture<OtpReuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtpReuseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtpReuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableTableAdminComponent } from './reusable-table-admin.component';

describe('ReusableTableAdminComponent', () => {
  let component: ReusableTableAdminComponent;
  let fixture: ComponentFixture<ReusableTableAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReusableTableAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReusableTableAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHrPageComponent } from './admin-hr-page.component';

describe('AdminHrPageComponent', () => {
  let component: AdminHrPageComponent;
  let fixture: ComponentFixture<AdminHrPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHrPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

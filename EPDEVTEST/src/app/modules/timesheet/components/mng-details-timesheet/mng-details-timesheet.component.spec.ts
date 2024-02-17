import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MngDetailsTimesheetComponent } from './mng-details-timesheet.component';

describe('MngDetailsTimesheetComponent', () => {
  let component: MngDetailsTimesheetComponent;
  let fixture: ComponentFixture<MngDetailsTimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MngDetailsTimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MngDetailsTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

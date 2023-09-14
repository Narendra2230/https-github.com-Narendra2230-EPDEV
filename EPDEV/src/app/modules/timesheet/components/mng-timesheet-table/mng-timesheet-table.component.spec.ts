import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MngTimesheetTableComponent } from './mng-timesheet-table.component';

describe('MngTimesheetTableComponent', () => {
  let component: MngTimesheetTableComponent;
  let fixture: ComponentFixture<MngTimesheetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MngTimesheetTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MngTimesheetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

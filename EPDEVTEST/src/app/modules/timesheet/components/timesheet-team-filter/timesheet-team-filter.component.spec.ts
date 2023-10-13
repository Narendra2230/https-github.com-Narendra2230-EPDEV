import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetTeamFilterComponent } from './timesheet-team-filter.component';

describe('TimesheetTeamFilterComponent', () => {
  let component: TimesheetTeamFilterComponent;
  let fixture: ComponentFixture<TimesheetTeamFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetTeamFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetTeamFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

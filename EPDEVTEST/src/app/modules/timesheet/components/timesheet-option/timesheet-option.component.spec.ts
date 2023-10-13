import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetOptionComponent } from './timesheet-option.component';

describe('TimesheetOptionComponent', () => {
  let component: TimesheetOptionComponent;
  let fixture: ComponentFixture<TimesheetOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

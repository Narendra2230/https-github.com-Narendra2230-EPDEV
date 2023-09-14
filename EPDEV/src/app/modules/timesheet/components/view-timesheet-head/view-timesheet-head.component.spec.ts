import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTimesheetHeadComponent } from './view-timesheet-head.component';

describe('ViewTimesheetHeadComponent', () => {
  let component: ViewTimesheetHeadComponent;
  let fixture: ComponentFixture<ViewTimesheetHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTimesheetHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTimesheetHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

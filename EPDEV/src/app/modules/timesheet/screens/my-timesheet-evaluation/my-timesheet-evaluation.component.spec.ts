import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTimesheetEvaluationComponent } from './my-timesheet-evaluation.component';

describe('MyTimesheetEvaluationComponent', () => {
  let component: MyTimesheetEvaluationComponent;
  let fixture: ComponentFixture<MyTimesheetEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTimesheetEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTimesheetEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

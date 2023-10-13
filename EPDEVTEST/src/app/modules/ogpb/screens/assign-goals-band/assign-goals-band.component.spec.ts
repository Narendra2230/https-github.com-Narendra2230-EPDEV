import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignGoalsBandComponent } from './assign-goals-band.component';

describe('AssignGoalsBandComponent', () => {
  let component: AssignGoalsBandComponent;
  let fixture: ComponentFixture<AssignGoalsBandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignGoalsBandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignGoalsBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

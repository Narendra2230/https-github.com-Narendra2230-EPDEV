import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveEvaluationComponent } from './executive-evaluation.component';

describe('ExecutiveEvaluationComponent', () => {
  let component: ExecutiveEvaluationComponent;
  let fixture: ComponentFixture<ExecutiveEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutiveEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutiveEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

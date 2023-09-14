import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanEvalutionRightComponent } from './performan-evalution-right.component';

describe('PerformanEvalutionRightComponent', () => {
  let component: PerformanEvalutionRightComponent;
  let fixture: ComponentFixture<PerformanEvalutionRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanEvalutionRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanEvalutionRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanEvalutionComponent } from './performan-evalution.component';

describe('PerformanEvalutionComponent', () => {
  let component: PerformanEvalutionComponent;
  let fixture: ComponentFixture<PerformanEvalutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanEvalutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanEvalutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

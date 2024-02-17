import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanEvalutionLeftComponent } from './performan-evalution-left.component';

describe('PerformanEvalutionLeftComponent', () => {
  let component: PerformanEvalutionLeftComponent;
  let fixture: ComponentFixture<PerformanEvalutionLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanEvalutionLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanEvalutionLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanEvalutionHeaderComponent } from './performan-evalution-header.component';

describe('PerformanEvalutionHeaderComponent', () => {
  let component: PerformanEvalutionHeaderComponent;
  let fixture: ComponentFixture<PerformanEvalutionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanEvalutionHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanEvalutionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

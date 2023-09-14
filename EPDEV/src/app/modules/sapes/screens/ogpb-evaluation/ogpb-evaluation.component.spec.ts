import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OgpbEvaluationComponent } from './ogpb-evaluation.component';

describe('OgpbEvaluationComponent', () => {
  let component: OgpbEvaluationComponent;
  let fixture: ComponentFixture<OgpbEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OgpbEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OgpbEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

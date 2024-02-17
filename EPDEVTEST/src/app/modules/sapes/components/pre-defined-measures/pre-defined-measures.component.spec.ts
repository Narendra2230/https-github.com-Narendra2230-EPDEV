import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDefinedMeasuresComponent } from './pre-defined-measures.component';

describe('PreDefinedMeasuresComponent', () => {
  let component: PreDefinedMeasuresComponent;
  let fixture: ComponentFixture<PreDefinedMeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreDefinedMeasuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreDefinedMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

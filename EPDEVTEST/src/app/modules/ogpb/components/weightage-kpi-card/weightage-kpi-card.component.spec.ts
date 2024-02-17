import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightageKpiCardComponent } from './weightage-kpi-card.component';

describe('WeightageKpiCardComponent', () => {
  let component: WeightageKpiCardComponent;
  let fixture: ComponentFixture<WeightageKpiCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightageKpiCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightageKpiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

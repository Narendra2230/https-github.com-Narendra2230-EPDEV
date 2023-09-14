import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorSowDurationComponent } from './contractor-sow-duration.component';

describe('ContractorSowDurationComponent', () => {
  let component: ContractorSowDurationComponent;
  let fixture: ComponentFixture<ContractorSowDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorSowDurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorSowDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

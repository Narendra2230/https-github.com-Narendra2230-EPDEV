import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorDurationComponent } from './contractor-duration.component';

describe('ContractorDurationComponent', () => {
  let component: ContractorDurationComponent;
  let fixture: ComponentFixture<ContractorDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorDurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

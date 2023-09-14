import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssoNonBillableComponent } from './asso-non-billable.component';

describe('AssoNonBillableComponent', () => {
  let component: AssoNonBillableComponent;
  let fixture: ComponentFixture<AssoNonBillableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssoNonBillableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssoNonBillableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

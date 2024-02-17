import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToatlBillingHoursComponent } from './toatl-billing-hours.component';

describe('ToatlBillingHoursComponent', () => {
  let component: ToatlBillingHoursComponent;
  let fixture: ComponentFixture<ToatlBillingHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToatlBillingHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToatlBillingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

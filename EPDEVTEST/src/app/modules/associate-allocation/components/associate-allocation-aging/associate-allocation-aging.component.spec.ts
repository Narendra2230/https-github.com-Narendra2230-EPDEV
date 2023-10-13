import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateAllocationAgingComponent } from './associate-allocation-aging.component';

describe('AssociateAllocationAgingComponent', () => {
  let component: AssociateAllocationAgingComponent;
  let fixture: ComponentFixture<AssociateAllocationAgingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateAllocationAgingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateAllocationAgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

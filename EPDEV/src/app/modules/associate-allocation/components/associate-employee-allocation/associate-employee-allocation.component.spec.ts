import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateEmployeeAllocationComponent } from './associate-employee-allocation.component';

describe('AssociateEmployeeAllocationComponent', () => {
  let component: AssociateEmployeeAllocationComponent;
  let fixture: ComponentFixture<AssociateEmployeeAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateEmployeeAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateEmployeeAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

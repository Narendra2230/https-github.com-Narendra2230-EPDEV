import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateAllocationPageComponent } from './associate-allocation-page.component';

describe('AssociateAllocationPageComponent', () => {
  let component: AssociateAllocationPageComponent;
  let fixture: ComponentFixture<AssociateAllocationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateAllocationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateAllocationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

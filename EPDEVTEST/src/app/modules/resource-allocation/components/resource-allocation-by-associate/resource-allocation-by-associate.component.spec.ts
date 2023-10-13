import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceAllocationByAssociateComponent } from './resource-allocation-by-associate.component';

describe('ResourceAllocationByAssociateComponent', () => {
  let component: ResourceAllocationByAssociateComponent;
  let fixture: ComponentFixture<ResourceAllocationByAssociateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceAllocationByAssociateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceAllocationByAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

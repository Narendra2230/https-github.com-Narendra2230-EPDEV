import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgHierarchyHeaderComponent } from './org-hierarchy-header.component';

describe('OrgHierarchyHeaderComponent', () => {
  let component: OrgHierarchyHeaderComponent;
  let fixture: ComponentFixture<OrgHierarchyHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgHierarchyHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgHierarchyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

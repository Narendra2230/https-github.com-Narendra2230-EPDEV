import { TestBed } from '@angular/core/testing';

import { OrgHierarchyService } from './org-hierarchy.service';

describe('OrgHierarchyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrgHierarchyService = TestBed.get(OrgHierarchyService);
    expect(service).toBeTruthy();
  });
});

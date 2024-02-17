import { TestBed } from '@angular/core/testing';

import { ResourceRequestService } from './resource-request.service';

describe('ResourceRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourceRequestService = TestBed.get(ResourceRequestService);
    expect(service).toBeTruthy();
  });
});

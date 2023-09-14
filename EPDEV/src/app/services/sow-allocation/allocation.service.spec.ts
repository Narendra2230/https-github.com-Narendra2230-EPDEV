import { TestBed } from '@angular/core/testing';

import { AllocationService } from './allocation.service';

describe('AllocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllocationService = TestBed.get(AllocationService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ResignationService } from './resignation.service';

describe('ResignationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResignationService = TestBed.get(ResignationService);
    expect(service).toBeTruthy();
  });
});

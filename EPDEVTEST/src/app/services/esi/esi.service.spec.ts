import { TestBed } from '@angular/core/testing';

import { EsiService } from './esi.service';

describe('EsiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EsiService = TestBed.get(EsiService);
    expect(service).toBeTruthy();
  });
});

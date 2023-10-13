import { TestBed } from '@angular/core/testing';

import { OgpbEvaluationService } from './ogpb-evaluation.service';

describe('OgpbEvaluationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OgpbEvaluationService = TestBed.get(OgpbEvaluationService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ObjectAnalyserService } from './object-analyser.service';

describe('ObjectAnalyserService', () => {
  let service: ObjectAnalyserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectAnalyserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

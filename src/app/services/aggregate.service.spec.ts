import { TestBed, inject } from '@angular/core/testing';

import { AggregateService } from './aggregate.service';

describe('AggregateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AggregateService]
    });
  });

  it('should be created', inject([AggregateService], (service: AggregateService) => {
    expect(service).toBeTruthy();
  }));
});

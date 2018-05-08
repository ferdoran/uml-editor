import { TestBed, inject } from '@angular/core/testing';

import { BoundedContextService } from './bounded-context.service';

describe('BoundedContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoundedContextService]
    });
  });

  it('should be created', inject([BoundedContextService], (service: BoundedContextService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { DeletionService } from './deletion.service';

describe('DeletionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeletionService]
    });
  });

  it('should be created', inject([DeletionService], (service: DeletionService) => {
    expect(service).toBeTruthy();
  }));
});

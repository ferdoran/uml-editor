import { TestBed, inject } from '@angular/core/testing';

import { DrawConnectionService } from './draw-connection.service';

describe('DrawConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawConnectionService]
    });
  });

  it('should be created', inject([DrawConnectionService], (service: DrawConnectionService) => {
    expect(service).toBeTruthy();
  }));
});

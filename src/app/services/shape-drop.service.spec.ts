import { TestBed, inject } from '@angular/core/testing';

import { ShapeDropService } from './shape-drop.service';

describe('ShapeDropService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShapeDropService]
    });
  });

  it('should be created', inject([ShapeDropService], (service: ShapeDropService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { ShapeSelectorService } from './shape-selector.service';

describe('ShapeSelectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShapeSelectorService]
    });
  });

  it('should be created', inject([ShapeSelectorService], (service: ShapeSelectorService) => {
    expect(service).toBeTruthy();
  }));
});

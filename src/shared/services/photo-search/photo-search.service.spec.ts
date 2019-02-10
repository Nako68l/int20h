import { TestBed } from '@angular/core/testing';

import { PhotoSearchService } from './photo-search.service';

describe('PhotoSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotoSearchService = TestBed.get(PhotoSearchService);
    expect(service).toBeTruthy();
  });
});

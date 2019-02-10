import { TestBed } from '@angular/core/testing';

import { PhotoEmotionsService } from './photo-emotions.service';

describe('PhotoEmotionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotoEmotionsService = TestBed.get(PhotoEmotionsService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AnimeytService } from './animeyt.service';

describe('AnimeytService', () => {
  let service: AnimeytService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimeytService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

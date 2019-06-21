import { TestBed } from '@angular/core/testing';

import { PostBugService } from './post-bug.service';

describe('PostBugService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostBugService = TestBed.get(PostBugService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GetBugsService } from './get-bugs.service';

describe('GetBugsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetBugsService = TestBed.get(GetBugsService);
    expect(service).toBeTruthy();
  });
});

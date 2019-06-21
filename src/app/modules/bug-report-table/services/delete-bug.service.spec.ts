import { TestBed } from '@angular/core/testing';

import { DeleteBugService } from './delete-bug.service';

describe('DeleteBugService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteBugService = TestBed.get(DeleteBugService);
    expect(service).toBeTruthy();
  });
});

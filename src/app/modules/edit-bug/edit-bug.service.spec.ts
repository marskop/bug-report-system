import { TestBed } from '@angular/core/testing';

import { EditBugService } from './edit-bug.service';

describe('EditBugService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditBugService = TestBed.get(EditBugService);
    expect(service).toBeTruthy();
  });
});

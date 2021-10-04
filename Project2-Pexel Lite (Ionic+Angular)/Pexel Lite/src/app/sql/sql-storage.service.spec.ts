import { TestBed } from '@angular/core/testing';

import { SqlStorageService } from './sql-storage.service';

describe('SqlStorageService', () => {
  let service: SqlStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqlStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

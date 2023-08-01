import { TestBed } from '@angular/core/testing';

import { LocalstorageServiceService } from './localstorage-service.service';

describe('LocalstorageServiceService', () => {
  let service: LocalstorageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

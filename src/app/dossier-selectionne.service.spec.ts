import { TestBed } from '@angular/core/testing';

import { DossierSelectionneService } from './dossier-selectionne.service';

describe('DossierSelectionneService', () => {
  let service: DossierSelectionneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DossierSelectionneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

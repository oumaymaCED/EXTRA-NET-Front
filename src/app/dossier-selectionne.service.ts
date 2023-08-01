import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dossier } from './components/cards/dossier.Model';

@Injectable({
  providedIn: 'root'
})
export class DossierSelectionneService {

  private dossierSelectionneSource = new BehaviorSubject<Dossier | null>(null);
  dossierSelectionne$ = this.dossierSelectionneSource.asObservable();

  selectionnerDossier(dossier: Dossier | null) {
    this.dossierSelectionneSource.next(dossier);
  }
}

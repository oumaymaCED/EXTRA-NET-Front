import { Component, OnInit } from '@angular/core';

import {Dossier} from 'src/app/components/cards/dossier.Model';
import { DossierService } from 'src/app/dossier.service';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  template: `
    <div *ngFor="let dossier of dossiers">
      <div class="card" (click)="afficherDetails(dossier)">
        <h3>{{ dossier.dosDossierNumber }}</h3>
        <p>{{ dossier.serviceShortName }}</p>
      </div>
    </div>
    <app-dossier-detail *ngIf="dossierSelectionne" [dossier]="dossierSelectionne"></app-dossier-detail>
    `
})
export class CardsComponent implements OnInit {

  dossiers: Dossier[] | undefined;
  selectedDossier: Dossier | null = null;
  dossierSelectionne: any;
  constructor(private dossiersService: DossierService) { }

  ngOnInit(): void {
    this.dossiersService.getDossiers().subscribe(
      (data: any) => {
        this.dossiers = data.result;
        
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  afficherDetails(dossier: Dossier) {
    this.selectedDossier = dossier;
  }
  getSelectedDossierDetails(): void {
    if (this.selectedDossier) {
      this.dossiersService.getDossierDetails(this.selectedDossier.dosId)
        .subscribe((data: any) => {
          this.selectedDossier = data.result;
        }, (error: any) => {
          console.log(error);
        });
    }
  }
  

}

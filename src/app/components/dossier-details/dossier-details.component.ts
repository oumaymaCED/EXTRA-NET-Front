import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Dossier,WorkingOrder,WorkingorderCosts,Services } from 'src/app/components/cards/dossier.Model';
import { DossierService } from 'src/app/dossier.service';
import { DataTableDirective } from 'angular-datatables';
import { orderBy } from 'lodash';
@Component({
  selector: 'app-dossier-details',
  templateUrl: './dossier-details.component.html',
  styleUrls: ['./dossier-details.component.css'],
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
export class DossierDetailsComponent  {
  
  @Input() dossier!: Dossier
  dossiers: Dossier[] = [];
  
  selectedDossier: Dossier | null = null;
  selectedWorkingOrder: WorkingOrder | null = null;
  dosId: string = '';
  showPanel = false;
  searchText: any;
  filteredDossiers: Dossier[] | undefined;
  sortedDossiers: Dossier[] | undefined;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dossierService: DossierService
  ) {}

  ngOnInit(): void {
    this.dossierService.getDossiers().subscribe(
      (data: any) => {
        this.dossiers = data.result;
        this.sortedDossiers = orderBy(this.dossiers, ['dosCreatedDate'], ['desc']);

      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  
 /* showDetails(dossier: Dossier) {
    this.selectedDossier = dossier;
    this.showPanel = true;
  }*/

  showDetails(dossier: any) {
    this.selectedDossier = dossier;
    const queryParams = { dossier: JSON.stringify(dossier) };
    this.router.navigate(["Details/", dossier.dosId]);
  }

  hideDetails(): void {
    this.selectedDossier = null;
    this.selectedWorkingOrder = null;
  }

  showWorkingOrderDetails(workingOrder: WorkingOrder): void {
    if (this.selectedWorkingOrder === workingOrder) {
      this.selectedWorkingOrder = null;
    } else {
      this.selectedWorkingOrder = workingOrder;
    }
  }
  hidePanel() {
    this.selectedDossier = null;
    this.selectedWorkingOrder = null;
    this.showPanel = false;
  }

  selectDossier(dossier: Dossier): void {
    this.selectedDossier = dossier;
  }
  
  navigateToDossierDetail2(selectedDossier: any): void {
    this.router.navigate(['/dossierdetails/',selectedDossier.dosId])
      }

      filterDossiers() {
        let searchText = this.searchText.toLowerCase();
        this.filteredDossiers = this.dossiers.filter(dossier => {
          return Object.values(dossier).some((val: any) => {
            if (val) {
              let str = val.toString().toLowerCase();
              return str.includes(searchText);
            }
            return false;
          });
        });
        console.log(this.filteredDossiers); // afficher les données filtrées dans la console pour déboguer
      }
      
      extractDateFromApi(apiDate: string): string {
        const dateOnly = new Date(apiDate).toISOString().slice(0, 10);
        return dateOnly;
      }

}

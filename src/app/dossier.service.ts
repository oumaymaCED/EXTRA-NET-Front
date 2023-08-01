import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {Dossier,WorkingOrder,WorkingorderCosts } from 'src/app/components/cards/dossier.Model';
import {purchaseInvoice,purchaseInvoiceLines} from 'src/app/components/dossier-details2/purchaseInvoice';


@Injectable({
  providedIn: 'root'
})
export class DossierService {

  private apiUrl = 'https://localhost:7174/api/Dossier/Dossier';
  private dossierSelectionne: Dossier | undefined;
  dossiers: Dossier[] = [];

  constructor(private http: HttpClient) { }


  getDossierDetails(dossierId: string): Observable<Dossier> {
    const url = `${this.apiUrl}/dossiers/${dossierId}`;
    return this.http.get<Dossier>(url);
  }
  getDossiers(): Observable<Dossier[]> {
    return this.http.get<Dossier[]>(this.apiUrl);
  }
  
  
  getDossierById(id:any): Observable<any> {

    return this.http.get<any>('https://localhost:7174/api/Dossier'+ '/' + id);
    
      }

  setDossierSelectionne(dossier: Dossier): void {
    this.dossierSelectionne = dossier;

  }


  getWorkingOrders(): Observable<WorkingOrder[]> {
    return this.http.get<WorkingOrder[]>(this.apiUrl);
  }
  


  getWorkingOrderCosts(): Observable<WorkingorderCosts[]> {
    return this.http.get<WorkingorderCosts[]>(this.apiUrl);
  }

  
 
  private apiUrll = 'https://localhost:7174/PurchaseInvoice/CreatePurchaseInvoice'; 


  sendPurchaseInvoice(purchaseInvoice: purchaseInvoice): Observable<any> {
    return this.http.post<any>(this.apiUrll, purchaseInvoice);
  }

 
  
 
}

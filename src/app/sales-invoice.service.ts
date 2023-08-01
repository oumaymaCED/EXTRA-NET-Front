import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {saleInvoice,SaleInvoiceLines} from 'src/app/components/sales-invoices/saleinvoice';


@Injectable({
  providedIn: 'root'
})
export class SalesInvoiceService {

  private apiUrl = 'https://localhost:7174/SalesInvoice';
  saleInvoice: saleInvoice[] = [];

  constructor(private http: HttpClient) { }
  
  getSalesInvoices(): Observable<saleInvoice[]> {
    return this.http.get<saleInvoice[]>(this.apiUrl);
  }

  getSaleinvoiceById(id:any): Observable<any> {

    return this.http.get<any>('https://localhost:7174'+ '/' + id);
    
      }

}

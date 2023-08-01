import { Injectable } from '@angular/core';
import {purchaseInvoice,purchaseInvoiceLines} from 'src/app/components/purchase-invoice-n/purchaseinvoiceModel';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PurchaseInvoiceService {

  private apiUrl = 'https://localhost:7174/PurchaseInvoice';
  purchaseinvoice: purchaseInvoice[] = [];

  constructor(private http: HttpClient) { }


  getpurchaseInvoicesd(): Observable<purchaseInvoice[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data: any[]) => {
        console.log(data);
        const transformedData: purchaseInvoice[] = data.map(item => {
          // Vérification si item.purchaseInvoiceLines est un tableau
          const purchaseInvoiceLines = Array.isArray(item.purchaseInvoiceLines) ? item.purchaseInvoiceLines : [];
  
          const transformedLines: purchaseInvoiceLines[] = purchaseInvoiceLines.map((lineItem: {
            ServiceID: any; WorkingOrdernumber: any; netAmount: any; taxAmount: any; grossAmount: any; quantity: any; taxRate: any; unitPrice: any; discount: any; 
     }) => {
            return {
              WorkingOrdernumber: lineItem.WorkingOrdernumber,
              netAmount: lineItem.netAmount,
              taxAmount: lineItem.taxAmount,
              grossAmount: lineItem.grossAmount,
              quantity: lineItem.quantity,
              taxRate: lineItem.taxRate,
              unitPrice: lineItem.unitPrice,
              ServiceID:lineItem.ServiceID,

              discount: lineItem.discount
            };
          });
    
          return {
            purchaseInvoiceNumber: item.purchaseInvoiceNumber,
            dossierNumber: item.dossierNumber,
            invoiceDate: item.invoiceDate,
            totalGrossAmount: item.totalGrossAmount,
            totalTaxAmount: item.totalTaxAmount,
            totalNetAmount: item.totalNetAmount,
            totalDiscount: item.totalDiscount,
            purchaseInvoiceLines: transformedLines
          };
        });
  
        return transformedData;
      })
    );
  }
  
  

  /**  getpurchaseInvoice(): Observable<purchaseInvoice[]> {
    return this.http.get<purchaseInvoice[]>(this.apiUrl)
      .pipe(
        map((response: any) => {
          if (Array.isArray(response)) {
            return response as purchaseInvoice[];
          } else {
            return []; // Retourner un tableau vide si la réponse n'est pas un tableau
          }
        }),
        
      );
  } */


  getpurchaseInvoicedById(id: string): Observable<purchaseInvoice> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      map((data: any) => {
        const purchaseInvoiceLines = Array.isArray(data.purchaseInvoiceLines) ? data.purchaseInvoiceLines : [];
  
        const transformedLines: purchaseInvoiceLines[] = purchaseInvoiceLines.map((lineItem: {
          ServiceID: any; WorkingOrdernumber: any; netAmount: any; taxAmount: any; grossAmount: any; quantity: any; taxRate: any; unitPrice: any; discount: any; 
      }) => {
          return {
            WorkingOrdernumber: lineItem.WorkingOrdernumber,
            netAmount: lineItem.netAmount,
            taxAmount: lineItem.taxAmount,
            grossAmount: lineItem.grossAmount,
            quantity: lineItem.quantity,
            taxRate: lineItem.taxRate,
            unitPrice: lineItem.unitPrice,
            ServiceID:lineItem.ServiceID,
            discount: lineItem.discount
          };
        });
  
        const transformedData: purchaseInvoice = {
          purchaseInvoiceNumber: data.purchaseInvoiceNumber,
          dossierNumber: data.dossierNumber,
          invoiceDate: data.invoiceDate,
          totalGrossAmount: data.totalGrossAmount,
          totalTaxAmount: data.totalTaxAmount,
          totalNetAmount: data.totalNetAmount,
          totalDiscount: data.totalDiscount,
          purchaseInvoiceLines: transformedLines
        };
  
        return transformedData;
      })
    );
  }
  

 getpurchaseInvoice(): Observable<purchaseInvoice[]> {
    return this.http.get<purchaseInvoice[]>(this.apiUrl);
  }
  
  
  getpurchaseInvoiceById(id:any): Observable<any> {

    return this.http.get<any>('https://localhost:7174/PurchaseInvoice'+ '/' + id);
    
     }

     private url='https://localhost:7174/PurchaseInvoice'
   
    updatepurchaseInvoice( purchaseInvoice : purchaseInvoice, id:any) : Observable<purchaseInvoice[] >{

      return this.http.put<purchaseInvoice[]>('https://localhost:7174/PurchaseInvoice'+ '/' + id
      , purchaseInvoice);
    }
 
    private urll= 'https://localhost:7174/PurchaseInvoice/dossier'

    purchaseinvoiceByDossierNumber(id:any): Observable<any> {

      return this.http.get<any>(`${this.urll}/${id}`);
      
    }

    private url3='https://localhost:7174/PurchaseInvoice'
    getIsTakenByServiceID(dossierNumber: string, serviceID: string): Observable<boolean> {
      const url = `${this.url3}/istaken/${dossierNumber}/${serviceID}`;
      return this.http.get<boolean>(url);
    }

     private uurll="https://localhost:7174/PurchaseInvoice/send"
    sendPurchaseInvoice(purchaseInvoice: any) {
      return this.http.post(this.uurll, purchaseInvoice);
    }
    
}

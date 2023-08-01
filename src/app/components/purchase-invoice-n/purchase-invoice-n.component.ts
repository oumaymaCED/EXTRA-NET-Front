import { Component, Input, OnInit } from '@angular/core';
import {purchaseInvoice,purchaseInvoiceLines} from 'src/app/components/purchase-invoice-n/purchaseinvoiceModel';
import { ActivatedRoute, Router } from '@angular/router';

import { PurchaseInvoiceService } from 'src/app/purchase-invoice.service';
import { orderBy } from 'lodash';

@Component({
  selector: 'app-purchase-invoice-n',
  templateUrl: './purchase-invoice-n.component.html',
  styleUrls: ['./purchase-invoice-n.component.css']
})
export class PurchaseInvoiceNComponent implements OnInit {
  @Input() purchaseInvoice!: purchaseInvoice
  purchaseinvoiced: purchaseInvoice[] = [];
  selectedpurchaseInvoice: purchaseInvoice | null = null;

  constructor(
    private router: Router,
    private purchaseInvoiceService: PurchaseInvoiceService
  ) {}

 
 /* ngOnInit(): void {
    this.purchaseInvoiceService
      .getpurchaseInvoice()
      .subscribe((response: any) => {
        console.log(response.result); // Vérifier la valeur de response.result
        
        const data = response.result;
        
        if (Array.isArray(data)) {
          const transformedData = data.map(item => {
            // Vérification si item.purchaseInvoiceLines est un tableau
            const purchaseInvoiceLines = Array.isArray(item.purchaseInvoiceLines) ? item.purchaseInvoiceLines : [];
    
            const transformedLines: purchaseInvoiceLines[] = purchaseInvoiceLines.map((lineItem: { WorkingOrdernumber: any; netAmount: any; taxAmount: any; grossAmount: any; quantity: any; taxRate: any; unitPrice: any; discount: any; }) => {
              return {
                WorkingOrdernumber: lineItem.WorkingOrdernumber,
                netAmount: lineItem.netAmount,
                taxAmount: lineItem.taxAmount,
                grossAmount: lineItem.grossAmount,
                quantity: lineItem.quantity,
                taxRate: lineItem.taxRate,
                unitPrice: lineItem.unitPrice,
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
    
          console.log(transformedData);
          this.purchaseinvoiced = transformedData;
        } else {
          console.log('La propriété "result" n\'est pas un tableau.');
        }
      },
      (error: any) => {
        console.log('Une erreur s\'est produite lors de la récupération des données.');
      });
  }
  */
  
  
 
 /*  ngOnInit(): void {
    this.purchaseInvoiceService
      .getpurchaseInvoice()
      .subscribe((result: purchaseInvoice[]) => {
        this.purchaseinvoiced = result;
        console.log(this.purchaseinvoiced); // Vérifiez les données dans la console
      });
  } */

/*  ngOnInit(): void {
    this.purchaseInvoiceService
      .getpurchaseInvoice()
      .subscribe((result: purchaseInvoice[]) => (this.purchaseinvoiced = result));
      console.log(this.purchaseinvoiced);
  }*/
  ngOnInit(): void {
    this.purchaseInvoiceService.getpurchaseInvoice().subscribe(
      (data: any) => {
        if (Array.isArray(data.result)) { // Vérifiez si data.result est un tableau
          const transformedData = data.result.map((item: { PurchaseInvoiceLines: any; PurchaseInvoiceNumber: any; DossierNumber: any; InvoiceDate: any; TotalGrossAmount: any; TotalTaxAmount: any; TotalNetAmount: any; TotalDiscount: any; }) => {
            const purchaseInvoiceLines = Array.isArray(item.PurchaseInvoiceLines) ? item.PurchaseInvoiceLines : [];
      
            const transformedLines: any[] = purchaseInvoiceLines.map((lineItem: any) => {
              const discount = lineItem.Discount !== "" ? parseFloat(lineItem.Discount) : undefined;
            
              return {
                workingOrdernumber: lineItem.WorkingOrdernumber,
                netAmount: lineItem.NetAmount,
                taxAmount: lineItem.TaxAmount,
                grossAmount: lineItem.GrossAmount,
                quantity: lineItem.Quantity,
                taxRate: lineItem.TaxRate,
                unitPrice: lineItem.UnitPrice,
                ServiceID:lineItem.ServiceID,
                discount: discount
              };
            });
            
        
            return {
              purchaseInvoiceNumber: item.PurchaseInvoiceNumber,
              dossierNumber: item.DossierNumber,
              invoiceDate: item.InvoiceDate,
              totalGrossAmount: item.TotalGrossAmount,
              totalTaxAmount: item.TotalTaxAmount,
              totalNetAmount: item.TotalNetAmount,
              totalDiscount: item.TotalDiscount,
              purchaseInvoiceLines: transformedLines
            };
          });
    
          console.log(transformedData);

          this.purchaseinvoiced = transformedData;
        } else {
          console.log('La propriété "result" n\'est pas un tableau.');
        }
      },
      (error: any) => {
        console.log('Une erreur s\'est produite lors de la récupération des données.');
      });
  }
  
  

  showDetails(purchaseInvoice: any) {
    this.selectedpurchaseInvoice = purchaseInvoice;
    this.router.navigate(["purchaseinvoicedetails/", purchaseInvoice.purchaseInvoiceNumber]);

  }

  sendPurchaseInvoice() {
    this.purchaseInvoiceService.sendPurchaseInvoice(this.purchaseInvoice)
      .subscribe(
        (response) => {
          // Traitez la réponse du serveur (le XML généré)
          console.log(response);
        },
        (error) => {
          // Traitez les erreurs de la requête
          console.error(error);
        }
      );

  
}}

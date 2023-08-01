import { DecimalPipe } from "@angular/common";

export interface PurchahseInvoice {
    PIID: string;
    DossierNumber: string;
    WorkingOrdernumber: string;
    SupplierName: string;
    WorkingOrderCostnumber: string;
    PINumber: string;
    InvoiceDate: Date;
    PurchaseInvoiceLines:  PurchaseInvoiceLine[];
  
    
     
  }
  export interface  PurchaseInvoiceLine {
   
    GrossAmount : DecimalPipe;
    TaxAmount: DecimalPipe;
    TaxExemptedAmount: DecimalPipe;
    TaxResversedChargeAmount: DecimalPipe;
    TaxImportAmount: DecimalPipe;
    NetAmount: DecimalPipe;
    OpenAmount: DecimalPipe;

  }
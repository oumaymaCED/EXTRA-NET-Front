export interface purchaseInvoice {
  purchaseInvoiceNumber: string;
  dossierNumber: string;
  invoiceDate: Date;
  totalGrossAmount: number;
  totalTaxAmount: number;
  totalNetAmount: number;
  totalDiscount : number;
  purchaseInvoiceLines: purchaseInvoiceLines[];
   
  }
  
  export interface purchaseInvoiceLines {
    
    //PurchaseInvoiceLineId: number;
    WorkingOrdernumber: string;
   
    netAmount: number;
    taxAmount: number;
    grossAmount: number;
    quantity : number;
    taxRate : number;
    unitPrice : number;
    discount: string;
    PurchaseInvoiceNumber: string;
    ServiceID:string;

   
   
  }
  
  
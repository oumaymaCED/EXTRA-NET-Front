export interface saleInvoice {
    salesId: string;
    salesNumber: string;
    salesIDate: Date;
    salesTotalGrossAmount: number;
    salesTotalTaxAmount: number;
    salesTotalNetAmount: number;
    salesDossierNumber:string;
    statusCode: string;
    statusName :String;

    purchaseInvoiceLines: SaleInvoiceLines[];
  }
  
  export interface SaleInvoiceLines {
   
    salesInvoiceLineId: string;
    unitPriceLine: number;
    quantityLine: number;
    netAmountLine: number;
    taxRateLine : number;

    taxAmountLine : number;
    discountLine : number;
    grossAmountLine: string;
    
    
   
  }
  
 
 



 
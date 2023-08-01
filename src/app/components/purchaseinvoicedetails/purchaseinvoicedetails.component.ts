import { Component, OnInit } from '@angular/core';
import { PurchaseInvoiceService } from 'src/app/purchase-invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { purchaseInvoice,purchaseInvoiceLines } from '../purchase-invoice-n/purchaseinvoiceModel';


@Component({
  selector: 'app-purchaseinvoicedetails',
  templateUrl: './purchaseinvoicedetails.component.html',
  styleUrls: ['./purchaseinvoicedetails.component.css']
})
export class PurchaseinvoicedetailsComponent implements OnInit {


  id : any ;
  purchaseinvoice1: any;
  purchaseinvoice2: any;
  selectedPurchaseInvoice: purchaseInvoice | undefined ;
  purchaseInvoiceLines: purchaseInvoiceLines[] = [];

  
  selectedPurchaseInvoiceLines: any;
  selectedWorkingOrderLineNumber: any;
  //Calcul des Totaux
  totalNetAmount: number = 0;
  totalTaxAmount: number = 0;
  totalDiscount: number = 0;
  totalGrossAmount: number = 0;
  constructor(
    private route: ActivatedRoute,
    private purchaseInvoiceService: PurchaseInvoiceService  ) { }

  
    
    ngOnInit() {
      this.route.params.subscribe(params => {
        this.id = params['id'];
      });
     console.log(this.purchaseInvoiceService.getpurchaseInvoiceById(this.id))
      this.purchaseInvoiceService.getpurchaseInvoiceById(this.id).subscribe(
        (data: any) => {
          console.log("dataresult",data.result);
          this.purchaseinvoice1 = data.result;
          this.purchaseInvoiceLines=this.purchaseinvoice1.PurchaseInvoiceLines
          console.log("dataPI1",this.purchaseinvoice1);
          //this.purchaseinvoice2= this.purchaseinvoice1;
          //console.log("dataPI2",this.purchaseinvoice2);

          
          this.selectedPurchaseInvoice=this.purchaseinvoice1;
          console.log("dataSI",this.selectedPurchaseInvoice);

        },
          
        (error: any) => {
          console.log(error);
        }
      );
    }
    showDetails(Purchaseinvoice: purchaseInvoice) {
   
      if(! (this.selectedPurchaseInvoice === Purchaseinvoice)) {
        this.selectedPurchaseInvoice = Purchaseinvoice;       
      }
    }
    
  
   /* showLinesDetails(PurchaseInvoiceLines: purchaseInvoiceLines): void {
      if (this.selectedPurchaseInvoiceLines === PurchaseInvoiceLines) {
        this.selectedPurchaseInvoiceLines = null;
      } else {
        this.selectedPurchaseInvoiceLines = PurchaseInvoiceLines;
       // this.selectedWorkingOrderLineNumber=this.purchaseinvoice1.purchaseInvoiceLines.indexOf(workingOrder)
       //index of selected workingOrderNumber
       // console.log(this.selectedWorkingOrderLineNumber)
      //  console.log(this.selectedWorkingOrder)
      }
    }*/

    

     //************************************************ *111111111111111111111 / A saisir 
     ChangeQuantity(value: string, index: number) {
      if (
        this.purchaseinvoice1 &&
        this.purchaseinvoice1.PurchaseInvoiceLines &&
        index >= 0 &&
        index < this.purchaseinvoice1.PurchaseInvoiceLines.length
      ) {
        console.log(this.purchaseinvoice1.PurchaseInvoiceLines);
        console.log(index);
    
        const purchaseInvoiceLine = this.purchaseinvoice1.PurchaseInvoiceLines[index];
        purchaseInvoiceLine.Quantity = Number(value); // Modification de purchaseInvoiceLine au lieu de purchaseinvoice1.purchaseInvoiceLine
    
        console.log("dataquantityNew", purchaseInvoiceLine.Quantity);
    
        const unitPrice = purchaseInvoiceLine.UnitPrice; // Modification de purchaseInvoiceLine au lieu de purchaseinvoice1.purchaseInvoiceLine
        const taxamount = purchaseInvoiceLine.TaxAmount; // Modification de purchaseInvoiceLine au lieu de purchaseinvoice1.purchaseInvoiceLine
        const netAmount = Number(value) * unitPrice;
        const discount = this.convertDiscount(purchaseInvoiceLine.discount); // Modification de purchaseInvoiceLine au lieu de this.purchaseInvoiceLines[index].discount
    
        const grossAmount = Number(netAmount) + Number(taxamount) - Number(discount);
    
        this.ChangeNetAmount(String(netAmount), index);
        this.ChangegrossAmount(String(grossAmount), index);
    
        this.calculateTotals();
      }
    }
    
  //*********************************************** *222222222222/ A saisir 
  ChangeUnitPrice(value: string, index: number) {
    const purchaseInvoiceLine = this.purchaseinvoice1.PurchaseInvoiceLines[index];
    purchaseInvoiceLine.UnitPrice = Number(value);
    const quantity =  purchaseInvoiceLine.Quantity;
    const taxamount =  purchaseInvoiceLine.TaxAmount;

    const netAmount = Number(value) * quantity;
    this.ChangeNetAmount(String(netAmount), index);
    
    const discount = this.convertDiscount( purchaseInvoiceLine.Discount);

   const grossAmount = Number(netAmount) + Number(taxamount) - Number(discount);

   this.ChangegrossAmount(String(grossAmount), index);

    this.calculateTotals(); // Mettre à jour les totaux
  
  }
/************************************************* */
   ChangeNetAmount(value: string , index: number){
  
    const purchaseInvoiceLine = this.purchaseinvoice1.PurchaseInvoiceLines[index];

    purchaseInvoiceLine.NetAmount = Number(value);
    const taxRate = purchaseInvoiceLine.TaxRate;
    const taxAmount = (Number(value) * taxRate) / 100;
    this.ChangetaxAmount(String(taxAmount), index);

    const disc = purchaseInvoiceLine.Discount;
    const discount = this.convertDiscount(purchaseInvoiceLine.Discount);
    
    const grossAmount = Number(value) + Number(taxAmount) - Number(discount);

    this.ChangegrossAmount(String(grossAmount), index);

    this.calculateTotals(); // Mettre à jour les totaux
   }  
    //*********************************************** *3333333333333333/ A saisir 
    ChangetaxRate(value: string , index: number){
      const purchaseInvoiceLine = this.purchaseinvoice1.PurchaseInvoiceLines[index];
     
      purchaseInvoiceLine.TaxRate =Number(value) ;
      const netAmount =  purchaseInvoiceLine.NetAmount;
      const taxAmount = (netAmount * Number(value)) / 100;
      this.ChangetaxAmount(String(taxAmount), index);
      this.calculateTotals(); // Mettre à jour les totaud

      const discount = this.convertDiscount( purchaseInvoiceLine.Discount);
     
      const grossAmount = Number(netAmount) + Number(taxAmount)- Number(discount);

      this.ChangegrossAmount(String(grossAmount), index);

    }
    /********************************** */
    
    ChangetaxAmount(value: string , index: number){
      const purchaseInvoiceLine = this.purchaseinvoice1.PurchaseInvoiceLines[index];

     
      purchaseInvoiceLine.TaxAmount =Number(value);
     const netAmount =  purchaseInvoiceLine.NetAmount;

     const discount = this.convertDiscount( purchaseInvoiceLine.Discount);

     const grossAmount = netAmount +Number(value) - Number(discount);

     this.ChangegrossAmount(String(grossAmount), index);
    
     this.calculateTotals(); // Mettre à jour les totaux
    }  
    /************************************************ */
    Changediscount(value: string, index: number) {
      const purchaseInvoiceLine = this.purchaseinvoice1.PurchaseInvoiceLines[index];

      purchaseInvoiceLine.Discount = value;
      const netAmount =  purchaseInvoiceLine.NetAmount;
      const taxAmount =  purchaseInvoiceLine.TaxAmount;

      const discountValue = value !== null ? Number(value) : 0; // Si la valeur est nulle, attribuer 0
      const grossAmount = Number(netAmount) +Number(taxAmount) - Number(discountValue);

      this.ChangegrossAmount(String(grossAmount), index);
      console.log(value)
      this.calculateTotals(); 
    }
    /****************************************************************** */            
    ChangegrossAmount(value: String , index: number){
      const purchaseInvoiceLine = this.purchaseinvoice1.PurchaseInvoiceLines[index];

      purchaseInvoiceLine.GrossAmount = Number(value);
      this.calculateTotals(); // Mettre à jour les totaux
    }


   
    calculateTotals() {
      // Réinitialisez les totaux à zéro avant de recalculer
      let initialNetAmount = 0;
      let initialTaxAmount = 0;
      let initialDiscount = 0;
      let initialGrossAmount = 0;
      const purchaseInvoiceLine = this.purchaseinvoice1.PurchaseInvoiceLines;
    
      // Parcourez les lignes de workingOrder pour calculer les totaux
      for (const cost of  purchaseInvoiceLine) {
        initialNetAmount += Number(cost.NetAmount);
        initialTaxAmount += Number(cost.TaxAmount);
        initialDiscount += Number(cost.Discount);
        initialGrossAmount += Number(cost.GrossAmount);
      }
     
      this.purchaseinvoice1.TotalNetAmount = initialNetAmount;
      this.purchaseinvoice1.TotalTaxAmount = initialTaxAmount;
      this.purchaseinvoice1.TotalDiscount = initialDiscount;
      this.purchaseinvoice1.TotalGrossAmount = initialGrossAmount;
   

    }
    convertDiscount(value: any): number {
      if (value === null) {
        return 0;
      } else {
        return parseFloat(value);
      }
    }
    deleteCost(index: number): void {
      this.purchaseinvoice1.PurchaseInvoiceLines.splice(index, 1);
      this.calculateTotals(); 

    }
    onSendDataUpdated() {
      this.purchaseInvoiceService.updatepurchaseInvoice(this.purchaseinvoice1, this.purchaseinvoice1.PurchaseInvoiceNumber).subscribe(
        res => {
          console.log('Success: ', res);
        },
        err => {
          console.error('Error: ', err);
         
        }
      );
    }

    sendPurchaseInvoice() {
      this.purchaseInvoiceService.sendPurchaseInvoice(this.purchaseinvoice1)
        .subscribe(
          (response) => {
            // Traitez la réponse du serveur (le XML généré)
            console.log(response);
            console.log(this.purchaseinvoice1);
          },
          (error) => {
            // Traitez les erreurs de la requête
            console.error(error);
            console.log(this.purchaseinvoice1);
          }
        );
  
    
  } 


}

import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Dossier,WorkingOrder,WorkingorderCosts,Services } from 'src/app/components/cards/dossier.Model';
import {purchaseInvoice,purchaseInvoiceLines} from 'src/app/components/dossier-details2/purchaseInvoice';

import { PurchaseInvoiceService } from 'src/app/purchase-invoice.service';


import { DossierService } from 'src/app/dossier.service';
import {DossierDetailsComponent}from'src/app/components/dossier-details/dossier-details.component';
import { LocalstorageServiceService } from 'src/app/storeService/localstorage-service.service';
import { v4 as uuidv4 } from 'uuid';
import { FormControl, FormGroup, NgForm, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dossier-details2',
  templateUrl: './dossier-details2.component.html',
  styleUrls: ['./dossier-details2.component.css'],
  
})
export class DossierDetails2Component implements OnInit {

  @Input() dossier!: Dossier
  @ViewChild('monBouton') monBouton: ElementRef | undefined;
  @ViewChild('bt') bt: ElementRef | undefined;

  purchaseinvoiced: purchaseInvoice[] = [];
  // les variables pour purchaseInvoiceByDossierNumber
  idDossier : any ;
  idDossierNumber:any;
  purchaseinvoiceByIdDossier: any;
  // les variableswde dossiers
  dossier2 :any ;
  dossier3 :any ;
  // Creation de PurchaseInvoice
  purchaseInvoice: purchaseInvoice = {
    purchaseInvoiceNumber: '',
    dossierNumber: '',
    invoiceDate: new Date(),
    purchaseInvoiceLines: [],
    totalGrossAmount: 0,
    totalTaxAmount: 0,
    totalNetAmount: 0,
    totalDiscount :0 
    };
  purchaseInvoiceLine: purchaseInvoiceLines = {
     // PurchaseInvoiceLineId:0,
      WorkingOrdernumber: '',
      netAmount: 0 ,
      taxAmount:0 ,
      grossAmount: 0,
      quantity: 0,
      taxRate: 0,
      unitPrice: 0,
      discount: '',
      PurchaseInvoiceNumber: '',
      ServiceID:''

   };
 //Calcul des Totaux
  totalNetAmount: number = 0;
  totalTaxAmount: number = 0;
  totalDiscount: number = 0;
  totalGrossAmount: number = 0;
   // les autres variables !!
  totalnetAmount : any;
  selectedWorkingOrderLineNumber : any;
  id : any ;
  selectedDossier: Dossier| undefined ;
  myItem : any;
  workingOrders: WorkingOrder[] = [];
  //thiswhat i add 14/06/2023
  workingorderCosts : WorkingorderCosts[] | undefined

  today: string = new Date().toISOString().slice(0,10);

  selectedWorkingOrder: WorkingOrder | null = null;
  selectedWorkingOrder2:WorkingOrder | null = null;
  showPanel = false;
  PIVId: any;
  Pid:any;
  purchaseInvoiced: { PIVId: string; };
  purchaseid :{Pid: string;};
 
  idInvoice: number = Math.floor(Math.random() * 1000000);

  formGroup!: FormGroup;

  

  //constructeur
  constructor(
    private route: ActivatedRoute,
    private dossierService: DossierService,
    private purchaseInvoiceService: PurchaseInvoiceService,
    private api : LocalstorageServiceService,
    //add
  

   
  ) {
    const invoiceNumber = uuidv4(); // génère un UUID unique
    this.purchaseInvoiced = {
     
      PIVId: invoiceNumber,
     
    };
    const idinvoice =uuidv4(); 
   
    this.purchaseid = {
      Pid: idinvoice,
       
    };


  }
 
    ngOnInit() {
     
    this.route.params.subscribe(params => { this.id = params['id'] }); // Do something with the id parameter... }); }     
    this.dossierService.getDossierById(this.id).subscribe(
      (data: any) => {
        
        this.dossier2 = data.result;
        this.selectedDossier = this.dossier2;
        this.dossier3 = Object.create(this.dossier2);
         
        //console.log(data)
      },
      (error: any) => {
        
        console.log(error);
      }
    );
    
    this.dossierService
      .getWorkingOrders()
      .subscribe((workingOrders: WorkingOrder[]) => {
        this.workingOrders = workingOrders;
        this.getpurchaseInvoiceByDossier(this.dossier2.dosDossierNumber);
        this.calculateTotals();
      });
    
      return this.dossier3
  

     
      
    
      }
  
  
  
  showDetails(dossier: Dossier) {
   
    if (! (this.selectedDossier === dossier)) {
      this.selectedDossier = dossier;
     
    }
  }
/*
  hideDetails(): void {
    this.selectedDossier = null;
    this.selectedWorkingOrder = null;
  }*/

  showWorkingOrderDetails(workingOrder: WorkingOrder): void {
    if (this.selectedWorkingOrder === workingOrder) {
      this.selectedWorkingOrder = null;
    } else {
      this.selectedWorkingOrder = workingOrder;
      this.selectedWorkingOrderLineNumber=this.dossier2.workingOrder.indexOf(workingOrder)
     //index of selected workingOrderNumber
      console.log(this.selectedWorkingOrderLineNumber)
      console.log(this.selectedWorkingOrder)
    }
  }
 
/*
  hidePanel() {
    this.selectedDossier = null;
    this.selectedWorkingOrder = null;
    this.showPanel = false;
  }
*/
  selectDossier(dossier: Dossier): void {
    this.selectedDossier = dossier;
  }

  //************************************************ *111111111111111111111 / A saisir 
  ChangeQuantity(value: string, index: number) {
    this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].quantity = value;
    const unitPrice = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].unitPrice;
    const taxamount = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].taxAmount;
    const netAmount = Number(value) * unitPrice;
    //console.log(discount)
    const discount = this.convertDiscount(this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].discount);
    
    // const discount = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].discount ?? 0;
    //const discount = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].discount;

    //const grossAmount = netAmount + value - Number(discount);
    const grossAmount = Number(netAmount) + Number(taxamount) - Number(discount);

    this.ChangeNetAmount(String(netAmount), index);
    this.ChangegrossAmount(String(grossAmount), index);

    this.calculateTotals(); // Mettre à jour les totaux 
  }
  //*********************************************** *222222222222/ A saisir 
  ChangeUnitPrice(value: string, index: number) {
    this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].unitPrice = value;
    const quantity = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].quantity;
    const taxamount = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].taxAmount;

    const netAmount = Number(value) * quantity;
    this.ChangeNetAmount(String(netAmount), index);
    
    //const discount = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].discount;
    //const discount = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].discount ?? 0;
    const discount = this.convertDiscount(this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].discount);

   //const grossAmount = netAmount + value -Number(discount) ;
   const grossAmount = Number(netAmount) + Number(taxamount) - Number(discount);

   this.ChangegrossAmount(String(grossAmount), index);

    this.calculateTotals(); // Mettre à jour les totaux
  
  }
/************************************************* */
   ChangeNetAmount(value: string , index: number){
    console.log(this.dossier3)
    console.log(value);
    console.log(index);

    console.log(this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts)
    this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].netAmount = value;
    const taxRate = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].taxRate;
    const taxAmount = (Number(value) * taxRate) / 100;
    this.ChangetaxAmount(String(taxAmount), index);

    const disc = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].discount;
    console.log(disc)
    const discount = this.convertDiscount(this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].discount);
    
   //const discount = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].discount ?? 0;
   const grossAmount = Number(value) + Number(taxAmount) - Number(discount);

    this.ChangegrossAmount(String(grossAmount), index);

    this.calculateTotals(); // Mettre à jour les totaux
    console.log(this.dossier2)
   }  
    //*********************************************** *3333333333333333/ A saisir 
    ChangetaxRate(value: string , index: number){
      
      console.log(this.dossier3)
      console.log(value);
      console.log(index);
      console.log(this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts)
      this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].taxRate = value;
      const netAmount = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].netAmount;
      const taxAmount = (netAmount * Number(value)) / 100;
      this.ChangetaxAmount(String(taxAmount), index);
      this.calculateTotals(); // Mettre à jour les totaux

      // const discount = this.convertDiscount(this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].discount);
      
     // const discount = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].discount;
      //const discount = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].discount ?? 0;
      const discount = this.convertDiscount(this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].discount);
     
      const grossAmount = Number(netAmount) + Number(taxAmount)- Number(discount);

      this.ChangegrossAmount(String(grossAmount), index);

    }
    /********************************** */
    
    ChangetaxAmount(value: string , index: number){
     
     this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].taxAmount = value;
     const netAmount = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].netAmount;

     //const discount = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].discount ?? 0;
     const discount = this.convertDiscount(this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].discount);

     //const discount = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].discount;
    // const grossAmount = netAmount + value - Number(discount);
     const grossAmount = netAmount +Number(value) - Number(discount);

     this.ChangegrossAmount(String(grossAmount), index);
    
     this.calculateTotals(); // Mettre à jour les totaux
    }  
    /************************************************ */
    Changediscount(value: string, index: number) {
     
      this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].discount = value;
      const netAmount = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].netAmount;
      const taxAmount = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].taxAmount;

      const discountValue = value !== null ? Number(value) : 0; // Si la valeur est nulle, attribuer 0
      const grossAmount = Number(netAmount) +Number(taxAmount) - Number(discountValue);

      this.ChangegrossAmount(String(grossAmount), index);
      console.log(value)
      this.calculateTotals(); 
    }
    /****************************************************************** */            
    ChangegrossAmount(value: String , index: number){
      
      this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].grossAmount = Number(value);
      this.calculateTotals(); // Mettre à jour les totaux
    }
    //********************************************** *44444444444444444444/ A saisir 
   /* Changediscount(value: string, index: number) {
    this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].discount = value;
    const netAmount = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].netAmount;
    const taxAmount = this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts[index].taxAmount;
    
    
    const grossAmount = (netAmount + taxAmount) -parseFloat(value);
    this.ChangegrossAmount(grossAmount, index);
    
    this.calculateTotals(); 
    }*/
   
    
    
    
    
    
    
    
    
   
    fillPurchaseInvoice(dossier : Dossier): purchaseInvoice {
      const purchaseInvoice: purchaseInvoice = {
        purchaseInvoiceNumber: this.purchaseInvoiced.PIVId,
        dossierNumber: dossier.dosDossierNumber,
        invoiceDate: new Date(this.today),
        
         totalGrossAmount: this.totalGrossAmount,
         totalTaxAmount: this.totalTaxAmount,
         totalNetAmount: this.totalNetAmount,
         totalDiscount:  this.totalDiscount,
         purchaseInvoiceLines: []
      };
    
     
      
        dossier.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts.forEach((workingorderCost: WorkingorderCosts) => {
          const purchaseInvoiceLine: purchaseInvoiceLines = {
           // PurchaseInvoiceLineId:this.idInvoice,
            WorkingOrdernumber: dossier.workingOrder[this.selectedWorkingOrderLineNumber].woWorkingOrderNumber,
            netAmount: workingorderCost.netAmount,
            taxAmount: workingorderCost.taxAmount,
            grossAmount: workingorderCost.grossAmount,
            quantity: workingorderCost.quantity,
            taxRate: workingorderCost.taxRate,
            unitPrice: workingorderCost.unitPrice,
            discount: workingorderCost.discount,
            PurchaseInvoiceNumber: this.purchaseInvoiced.PIVId,
            ServiceID:workingorderCost.services.serviceID

          };
          purchaseInvoice.purchaseInvoiceLines.push(purchaseInvoiceLine);
          console.log('PurchaseInvoiceEnvoyé: ',purchaseInvoice)

        });
  
      
      
      return purchaseInvoice;
    } 
    
    onSendData() {
      const purchaseInvoice = this.fillPurchaseInvoice(this.dossier3)
      this.dossierService.sendPurchaseInvoice(purchaseInvoice).subscribe(
        res => {
          console.log('Success: ', res);
        },
        err => {
          console.error('Error: ', err);
         
        }
      );
    }
    
    deleteCost(index: number): void {
      this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts.splice(index, 1);
      this.calculateTotals(); 

    }
    
    getpurchaseInvoiceByDossier(idDossier: any){
      this.purchaseInvoiceService.purchaseinvoiceByDossierNumber(idDossier).subscribe(
        // this.purchaseInvoiceService.getpurchaseInvoice().subscribe(
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
                    // purchaseInvoie affichage par IdDossier
               console.log("dataPImtee3koldosssier",transformedData);
   
               //console.log(transformedData);
     
               this.purchaseinvoiceByIdDossier = transformedData;
             } else {
               console.log('La propriété "result" n\'est pas un tableau.');
             }
           },
           (error: any) => {
             console.log('Une erreur s\'est produite lors de la récupération des données.');
           });
   
    }
    
    ngAfterViewInit() {
      if (this.monBouton && this.monBouton.nativeElement) {
        this.monBouton.nativeElement.addEventListener('click', () => {
          this.getpurchaseInvoiceByDossier(this.dossier2.dosDossierNumber);
        });
      }
      if (this.bt && this.bt.nativeElement) {
        this.bt.nativeElement.addEventListener('click', () => {
          this.calculateTotals();
        });
      }
    }
     
    calculateTotals() {
      // Réinitialisez les totaux à zéro avant de recalculer
      let initialNetAmount = 0;
      let initialTaxAmount = 0;
      let initialDiscount = 0;
      let initialGrossAmount = 0;
    
      // Parcourez les lignes de workingOrder pour calculer les totaux
      for (const cost of this.dossier3.workingOrder[this.selectedWorkingOrderLineNumber].workingorderCosts) {
        initialNetAmount += Number(cost.netAmount);
        initialTaxAmount += Number(cost.taxAmount);
        initialDiscount += Number(cost.discount);
        initialGrossAmount += Number(cost.grossAmount);
      }
     
      this.totalNetAmount = initialNetAmount;
      this.totalTaxAmount = initialTaxAmount;
      this.totalDiscount = initialDiscount;
      this.totalGrossAmount = initialGrossAmount;
   

    }
    
   
    
    convertDiscount(value: any): number {
      if (value === null) {
        return 0;
      } else {
        return parseFloat(value);
      }
    }

   
    onWorkingOrderChange(): void {
      if (this.selectedDossier && this.selectedDossier.selectedWorkingOrder) {
        console.log("if : ",this.selectedWorkingOrder?.workingorderCosts);
        const selectedWorkingOrderNumber = this.selectedDossier.selectedWorkingOrder.woWorkingOrderNumber;
        this.selectedDossier.selectedWorkingOrder.workingorderCosts = this.selectedDossier.workingOrder.filter(
          cost => cost.woWorkingOrderNumber === selectedWorkingOrderNumber,
        );
        this.calculateTotals();
      } else {
        console.log("else : ",this.selectedWorkingOrder?.workingorderCosts[0].quantity);
        console.log("else : ",this.selectedWorkingOrder?.workingorderCosts[1].quantity);
        this.workingorderCosts = [];
        console.log("elseStatment"),
        this.calculateTotals();

      }
    }
    onworkingorderchange2(workingOrder: WorkingOrder): void {
      if (this.selectedWorkingOrder2 === workingOrder) {
        this.selectedWorkingOrder = null;
      } else {
        this.selectedWorkingOrder2 = workingOrder;
      
      }
    }

    
    
 //Addform
 
 public checkServiceTaken(si: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    this.purchaseInvoiceService.getIsTakenByServiceID(this.dossier2.dosDossierNumber, si)
      .subscribe(v => {
        console.log(this.dossier2.dosDossierNumber);
        console.log(si);
        console.log('Le service est pris:', v);
        resolve(v);
      }, error => {
        console.error('Error fetching service taken status:', error);
        reject(error);
      });
  });
}


  
    
}

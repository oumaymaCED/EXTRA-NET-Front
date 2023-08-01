import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesInvoiceService } from 'src/app/sales-invoice.service';
import {saleInvoice,SaleInvoiceLines} from 'src/app/components/sales-invoices/saleinvoice';

@Component({
  selector: 'app-sales-invoicesdetails',
  templateUrl: './sales-invoicesdetails.component.html',
  styleUrls: ['./sales-invoicesdetails.component.css']
})
export class SalesInvoicesdetailsComponent implements OnInit {

  id : any ;
  saleinvoice1: any;
  purchaseinvoice2: any;

  selectedsaleInvoice: any;
  constructor(
    private route: ActivatedRoute,
    private salesInvoice: SalesInvoiceService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.salesInvoice.getSaleinvoiceById(this.id).subscribe(
      (data: any) => {
        this.saleinvoice1 = data.result;
        this.selectedsaleInvoice=this.saleinvoice1;
        

      },
        
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  showDetails(SalesInvoice: saleInvoice) {
   
    if (this.selectedsaleInvoice === SalesInvoice) {
      this.selectedsaleInvoice = null;
    } else {
      this.selectedsaleInvoice = SalesInvoice;
    }
  }

}

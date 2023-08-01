import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesInvoiceService } from 'src/app/sales-invoice.service';
import {saleInvoice,SaleInvoiceLines} from 'src/app/components/sales-invoices/saleinvoice';

@Component({
  selector: 'app-sales-invoices',
  templateUrl: './sales-invoices.component.html',
  styleUrls: ['./sales-invoices.component.css']
})
export class SalesInvoicesComponent implements OnInit {
  salesinvoice: saleInvoice[] = [];
  selectedsaleInvoice: saleInvoice | null = null;



  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private salesInvoice: SalesInvoiceService
  ) { }

  ngOnInit(): void {
    this.salesInvoice.getSalesInvoices().subscribe(
      (data: any) => {
        this.salesinvoice = data.result;

      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  showDetails(saleinvoice: any) {
    this.selectedsaleInvoice = saleinvoice;
    this.router.navigate(["SaleInvoicesdetails/", saleinvoice.salesId]);

  }

}

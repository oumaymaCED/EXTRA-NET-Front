import { Component, OnInit } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { LocalstorageServiceService } from 'src/app/storeService/localstorage-service.service';

@Component({
  selector: 'app-forms-layouts',
  templateUrl: './forms-layouts.component.html',
  styleUrls: ['./forms-layouts.component.css']
})
export class FormsLayoutsComponent implements OnInit {
 dossier: any
 taskform !: FormGroup
  formBuilder: any;
  constructor(
    private api :LocalstorageServiceService
  ) { 
  
  }

  ngOnInit(): void {
    this.taskform = this.formBuilder.group({

      idpurchaseInvoice: [],
      
      DossierNumber: [''],
      
      workingOrdernumber: [''],
      
      SupplierName: [''],
      
      PINumber: [''],

      InvoiceDate: [],
      
      OpenAmount: [''],
      
      
      
     });
    this.dossier=this.api.getdossier()
  }

}

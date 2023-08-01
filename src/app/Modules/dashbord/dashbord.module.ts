import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dashboardRoutingModule } from './dashboard-routing.module';
import { ModalComponent } from 'src/app/components/modal/modal.component';



@NgModule({
  declarations: [  ModalComponent,
  ],
  imports: [
    CommonModule,
    dashboardRoutingModule,
  

  ]
})
export class DashbordModule { }

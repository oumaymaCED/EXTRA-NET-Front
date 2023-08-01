import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Dashboard2Component } from 'src/app/dashboard2/dashboard2.component';

const routes: Routes = [
  {path:'',component:Dashboard2Component,

   children:[
    { path: '',   redirectTo: 'Modal', pathMatch: 'full' },
    {path:'Modal',component: ModalComponent},
] } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class dashboardRoutingModule { }

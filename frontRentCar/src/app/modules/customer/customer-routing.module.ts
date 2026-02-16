import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { CarDetailsComponent } from '../../customer/car-details/car-details.component';
import { CustomerCarDetailComponent } from './components/customer-car-detail/customer-car-detail.component';

const routes: Routes = [
   {path: "dashboard", component: CustomerDashboardComponent},
   {path: "carDetail/:id", component: CustomerCarDetailComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

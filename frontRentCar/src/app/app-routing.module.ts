import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './modules/admin/components/admin-dashboard/admin-dashboard.component';


const routes: Routes = [
  {path: "register", component: SignupComponent},
  {path: "login", component: LoginComponent}
 
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

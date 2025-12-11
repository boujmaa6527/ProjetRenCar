import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { MenuComponent } from './menu/menu.component';
import { UpdateCarComponent } from './modules/admin/components/update-car/update-car.component';
import { CustomerDashboardComponent } from './modules/customer/components/customer-dashboard/customer-dashboard.component';
import { AdminDashboardComponent } from './modules/admin/components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    {path: "register", component: SignupComponent},
    {path: "login", component: LoginComponent},
    {path: "menu", component: MenuComponent},
    {path: "admin", loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule)},
    {path: "customer", loadChildren: () => import("./modules/customer/customer.module").then(m => m.CustomerModule)},
    {path: "admin/car/:id", component: UpdateCarComponent},
    {path: "", component: CustomerDashboardComponent}
];

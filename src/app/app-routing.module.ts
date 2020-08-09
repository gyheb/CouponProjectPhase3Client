import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { CompanyComponent } from './components/company/company.component';
import { CustomerComponent } from './components/customer/customer.component';
import { UpdateCompanyComponent } from './components/update-company/update-company.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "admin", component: AdminComponent},
  {path: "company", component: CompanyComponent},
  {path: "company/:compId", component: UpdateCompanyComponent},
  {path: "customer", component: CustomerComponent},
  {path: "customer/:custId", component: UpdateCustomerComponent},
  {path:"", pathMatch:"full", redirectTo:"login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

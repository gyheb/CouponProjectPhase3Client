import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { Coupon } from 'src/app/models/coupon';
import { AdminService } from 'src/app/services/admin.service';
import { Customer } from 'src/app/models/customer';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  addCompanyForm: FormGroup;
  addCustomerForm: FormGroup;
  coupons:Coupon[]=[];
  companies:Company[];
  customers:Customer[];
  company:Company;

  constructor(
    private fb:FormBuilder,
    private service: AdminService,
    private route:Router,
    ) { }

  ngOnInit(): void {

    // Company Methods
    this.addCompanyForm = this.fb.group({
      name: [],
      email: [],
      password: []
    });

    this.service.getAllCompanies().subscribe(
      comps => this.companies = comps,
      err => alert(err.error)
    );

    // Customer Methods
    this.addCustomerForm = this.fb.group({
      name: [],
      last: [],
      email:[],
      password: []
    });

    this.service.getAllCustomers().subscribe(
      custs => this.customers = custs,
      err => alert(err.error)
    );

  } // end of onInit

  
  logout(){
    this.service.logout();
    sessionStorage.clear();
    this.route.navigate(['login']);
  }

  // Company Methods
  public addCompany(){
    let company = new Company(0,
    this.addCompanyForm.controls['name'].value,
    this.addCompanyForm.controls['email'].value,
    this.addCompanyForm.controls['password'].value,
    this.coupons);
    this.service.addCompany(company).subscribe(
      comp =>{
        this.companies.push(comp)
      }, err=> {
        alert(err.error)
      });
  }

  public deleteCompany(compId:number){
    this.service.deleteCompany(compId).subscribe(
      response =>{
        alert(response)
        this.companies.shift();
      }, err => alert(err.error)
    );
  }

  // Customer Methods
  public addCustomer(){
    let customer = new Customer(0,
    this.addCustomerForm.controls['name'].value,
    this.addCustomerForm.controls['last'].value,
    this.addCustomerForm.controls['email'].value,
    this.addCustomerForm.controls['password'].value,
    this.coupons);
    this.service.addCustomer(customer).subscribe(
      cust =>{
        this.customers.push(cust)
      }, err=> {
        alert(err.error);
      });
  }

  public deleteCustomer(custId:number){
    this.service.deleteCustomer(custId).subscribe(
      response =>{
        alert(response);
        this.customers.shift();
      }, err => alert (err.error)
    );
  }


}

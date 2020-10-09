import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  updateCustomerForm: FormGroup;
  customer:Customer;
  custId;

  constructor(
    private service: AdminService,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit(): void {

    this.custId = this.route.snapshot.params.custId;
    // console.log("compid = " + this.custId)

    this.updateCustomerForm = this.fb.group({
      name: [],
      last: [],
      email:[],
      password: []
    });

    this.service.getOneCustomer(this.custId).subscribe(
      c =>{
        // console.log(c)
        this.customer = c
        this.updateCustomerForm.controls['name'].setValue(c.firstName)
        this.updateCustomerForm.controls['last'].setValue(c.lastName)
        this.updateCustomerForm.controls['email'].setValue(c.email)
        this.updateCustomerForm.controls['password'].setValue(c.password)
    }, err => alert(err.error)
    );

  }

  public updateCustomer(){
    this.customer.firstName = this.updateCustomerForm.controls['name'].value
    this.customer.lastName = this.updateCustomerForm.controls['last'].value
    this.customer.email = this.updateCustomerForm.controls['email'].value
    this.customer.password = this.updateCustomerForm.controls['password'].value
    this.service.updateCustomer(this.customer).subscribe(
      response => {
        alert(response)
        this.router.navigate(['admin']);
      }, err =>alert(err.error)
    );
  }

}

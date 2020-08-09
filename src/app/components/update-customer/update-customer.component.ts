import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  updateCustomerForm: FormGroup;
  customer:Customer;
  custId = this.route.snapshot.params.custId;

  constructor(
    private service: AdminService,
    private fb:FormBuilder,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.updateCustomerForm = this.fb.group({
      name: [],
      last: [],
      email:[],
      password: []
    });

    this.service.getOneCustomer(this.custId).subscribe(
      c =>
        this.customer = c,
       err => {alert(err.error)
    });

  }

  public updateCustomer(){
    this.service.updateCustomer(this.customer).subscribe(
      cust => {

      }, err =>alert (err.error)
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { FormBuilder } from '@angular/forms';
import { Coupon } from 'src/app/models/coupon';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  coupons: Coupon[];

  constructor(
    private service:CustomerService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {

    this.service.getAllCoupons().subscribe(
      coups => this.coupons = coups,
      err => alert(err.error)
    );

  }

}

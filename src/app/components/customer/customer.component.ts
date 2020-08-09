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
  systemCoups: Coupon[];

  constructor(
    private service:CustomerService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {

    this.service.getAllCoupons().subscribe(
      coups => this.coupons = coups,
      err => alert(err.error)
    );

    this.service.getAllSystemCoupons().subscribe(
      coups => this.systemCoups = coups,
      err => alert(err.error)
    );

  }

  public purchaseCoupon(coupon:Coupon){
    this.service.purchaseCoupon(coupon).subscribe(
      coup => {

      },
    );
  }

}

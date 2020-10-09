import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coupon } from 'src/app/models/coupon';
import { Router } from '@angular/router';
import { CategoryType } from 'src/app/models/category-type';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  coupons: Coupon[];
  systemCoups: Coupon[];
  priceForm:FormGroup;
  categories:String[]=[];
  categoryForm:FormGroup;
  company:Company;

  constructor(
    private service:CustomerService,
    private fb:FormBuilder,
    private route:Router
  ) { }

  ngOnInit(): void {
    
    this.priceForm = this.fb.group({
      price:["", Validators.required]
    });
    
    this.categoryForm = this.fb.group({
      categorySelect:["", Validators.required]
    });
    
    this.service.getAllCoupons().subscribe(
      coups => this.coupons = coups,
      err => alert(err.error)
      );
      
      
      this.service.getAllSystemCoupons().subscribe(
        coups => this.systemCoups = coups,
        err => alert(err.error)
        );
        
    for(let c in CategoryType){this.categories.push(c)};


  } // end of onInit

  getAllCoupons(){
    this.service.getAllSystemCoupons().subscribe(
      coups => this.systemCoups = coups,
      err=> alert(err.error)
    );
  }

  getByPrice(){
    this.service.getAllCouponsUpToPrice(this.priceForm.controls['price'].value).subscribe(
      newCoupons => {
        // Adds company back to each coupon because @JsonIgnore
        newCoupons.forEach(c=>{
          this.service.getCompanyFromCoupon(c.couponId).subscribe(
            company =>{
              c.company = company;
            }, err => alert(err.err)
          );
        })
        this.systemCoups = newCoupons;
      }, err => alert("please choose a price")
    );
  }

  getByCategory(){
    this.service.getAllCouponsByCategory(this.categoryForm.controls['categorySelect'].value).subscribe(
      newCoupons =>{
        // Adds company back to each coupon because @JsonIgnore
        newCoupons.forEach(c =>{
          this.service.getCompanyFromCoupon(c.couponId).subscribe(
            company => {
              c.company = company;
            }, err => alert(err.error)
          );
        })
        this.systemCoups = newCoupons;
      }, err => alert("please choose a category")
    );
  }

  logout(){
    this.service.logout();
    sessionStorage.clear();
    this.route.navigate(['login']);
  }

  public purchaseCoupon(coupon:Coupon){
    this.service.purchaseCoupon(coupon).subscribe(
      response => { 
        alert(response)
        this.coupons.push(coupon);
      }, err => alert("Coupon already purchased OR out of stock!")
    );
  }

}

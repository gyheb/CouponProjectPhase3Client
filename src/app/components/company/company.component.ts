import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryType } from 'src/app/models/category-type';
import { CompanyService } from 'src/app/services/company.service';
import { Coupon } from 'src/app/models/coupon';
import { Company } from 'src/app/models/company';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  addCouponForm: FormGroup;
  CouponsForm: FormGroup;
  priceForm:FormGroup;
  categoryForm:FormGroup;
  coupons:Coupon[]=[];
  categories:String[]=[];
  allCoupons:Coupon[];
  customers:Customer[]=[];
  coupon:Coupon;
  company:Company;


  constructor(
    private fb:FormBuilder,
    private service:CompanyService,
    private route:Router
  ) { }

  ngOnInit(): void {

    // Coupons Form
    this.addCouponForm = this.fb.group({
      type: ["", Validators.required],
      title: ["", Validators.required],
      description: [],
      startDate: ["", Validators.required],
      endDate: ["", [Validators.required, this.valiDate]],
      amount: ["", [Validators.required, Validators.min(1)]],
      price: ["", [Validators.required, Validators.min(0)]],
      image: []
    });

    this.priceForm = this.fb.group({
      price:["", Validators.required]
    });
    
    this.categoryForm = this.fb.group({
      categorySelect:["", Validators.required]
    });

    for(let c in CategoryType){this.categories.push(c)};

    this.service.getAllCoupons().subscribe(
      coups => this.allCoupons = coups,
      err => alert(err.error)
    );

  } //the end of onInit

  logout(){
    this.service.logout();
    sessionStorage.clear();
    this.route.navigate(['login']);
  }

  getAllCoupons(){
    this.service.getAllCoupons().subscribe(
      coups => this.allCoupons = coups,
      err => alert(err.error)
    );
  }

  getByPrice(){
    this.service.getCouponsUpToPrice(this.priceForm.controls['price'].value).subscribe(
      newCoupons => {
        // Adds company back to each coupon because @JsonIgnore
        newCoupons.forEach(c=>{
          this.service.getCompanyFromCoupon(c.couponId).subscribe(
            company =>{
              c.company = company;
            }, 
          );
        })
      }, err => alert("please choose a price")
    );
  }

  getByCategory(){
    this.service.getCouponsByCategory(this.categoryForm.controls['categorySelect'].value).subscribe(
      newCoupons =>{
        // Adds company back to each coupon because @JsonIgnore
        newCoupons.forEach(c =>{
          this.service.getCompanyFromCoupon(c.couponId).subscribe(
            company => {
              c.company = company;
            }, err => alert(err.error)
          );
        }) 
      }, err => alert("please choose a category")
    );
  }

  public addCoupon(){
    let coupon = new Coupon(0,
      this.company,
      this.addCouponForm.controls['type'].value,
      this.addCouponForm.controls['title'].value,
      this.addCouponForm.controls['description'].value,
      this.addCouponForm.controls['startDate'].value,
      this.addCouponForm.controls['endDate'].value,
      this.addCouponForm.controls['amount'].value,
      this.addCouponForm.controls['price'].value,
      this.addCouponForm.controls['image'].value,
      this.customers
      );
      this.service.addCoupon(coupon).subscribe(
        coup =>{
          this.allCoupons.push(coup)
        }, err => {
          alert(err.error)
        });
      }

  public deleteCoupon(coupId:number){
    this.service.deleteCoupon(coupId).subscribe(
      response =>{
        alert(response)
        this.allCoupons.shift();
        this.route.navigate(['company']);
      }, err => alert(err.error)
      );
  }

      // Checks that the coupon endDate is not in the past
      valiDate(control:AbstractControl){
        const currentDate: Date = new Date();
        let expiration: Date = new Date(control.value);
        if(currentDate>expiration )
        return {dateError:true};
      }



}

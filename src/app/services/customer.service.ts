import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../models/coupon';
import { CategoryType } from '../models/category-type';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient:HttpClient) { }

  public purchaseCoupon(coupon:Coupon){
    return this.httpClient.post("http://localhost:8080/customer/"
    + sessionStorage.token, coupon);
  }
  
  public getAllCoupons(){
    return this.httpClient.get<Coupon[]>("http://localhost:8080/customer/"
    + sessionStorage.token + "/AllCoupons");
  }

  public getAllSystemCoupons(){
    return this.httpClient.get<Coupon[]>("http://localhost:8080/customer/"
    + sessionStorage.token + "/AllSystemCoupons");
  }

  public getAllCouponsByCategory(type:CategoryType){
    return this.httpClient.get<Coupon[]>("http://localhost:8080/customer/"
    + sessionStorage.token + "/CouponsByCategory/" + type);
  }

  public getAllCouponsUpToPrice(price:number){
    return this.httpClient.get<Coupon[]>("http://localhost:8080/customer/"
    + sessionStorage.token + "CouponsUpToPrice" + price);
  }

  public getOneCoupon(coupId){
    return this.httpClient.get<Coupon>("http://localhost:8080/customer/"
    + sessionStorage.token + "/Coupon/" + coupId);
  }

  public getCustomerDetails(){
    return this.httpClient.get<Customer>("http://localhost:8080/customer/"
    + sessionStorage.token + "/CustomerDetails");
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../models/coupon';
import { CategoryType } from '../models/category-type';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient:HttpClient) { }

  public addCoupon(coupon:Coupon){
    return this.httpClient.post<Coupon>("http://localhost:8080/company/"
    + sessionStorage.token + "/Coupon", coupon);
  }

  public updateCoupon(coupon:Coupon){
    return this.httpClient.put<Coupon>("http://localhost:8080/company/"
    + sessionStorage + "/Coupon", coupon);
  }

  public deleteCoupon(coupId:number){
    return this.httpClient.delete("http://localhost:8080/company/"
    + sessionStorage.token + "/Coupon/" + coupId);
  }

  public getOneCoupon(coupId:number){
    return this.httpClient.get<Coupon>("http://localhost:8080/copmany/"
    + sessionStorage.token + "/Coupon/" + coupId);
  }

  public getAllCoupons(){
    return this.httpClient.get<Coupon[]>("http://localhost:8080/company/"
    + sessionStorage.token + "/AllCoupons");
  }

  public getCouponsByCategory(type:CategoryType){
    return this.httpClient.get<Coupon[]>("http://localhost:8080/company/"
    + sessionStorage.token + "/CouponsByCategory/" + type);
  }

  public getCouponsUpToPrice(price:number){
    return this.httpClient.get<Coupon[]>("http://localhost:8080/company/"
    + sessionStorage.token + "/CouponsUpToPrice/" + price);
  }

  public getComapnyDetails(){
    return this.httpClient.get<Company>("http://localhost:8080/company"
    + sessionStorage.token + "/CompanyDetails");
  }

}

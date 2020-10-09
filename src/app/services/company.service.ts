import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../models/coupon';
import { CategoryType } from '../models/category-type';
import { Company } from '../models/company';
import { Customer } from '../models/customer';

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
    return this.httpClient.put("http://localhost:8080/company/"
    + sessionStorage.token + "/Coupon", coupon, {responseType: "text"});
  }

  public deleteCoupon(coupId:number){
    return this.httpClient.delete("http://localhost:8080/company/"
    + sessionStorage.token + "/Coupon/" + coupId, {responseType: "text"});
  }

  public getCompanyFromCoupon(coupId:number) {
    return this.httpClient.get<Company>("http://localhost:8080/company/"
    + sessionStorage.token + "/" + coupId);
  }

  public getCustsFromCoupon(coupId:number) {
    return this.httpClient.get<Customer[]>("http://localhost:8080/company/custsfromcoupon/"
    + sessionStorage.token + "/" + coupId);
  }

  public getOneCoupon(coupId:number){
    return this.httpClient.get<Coupon>("http://localhost:8080/company/"
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
  
  public logout(){
    return this.httpClient.post("http://localhost:8080/admin/logout", sessionStorage.token);
  }

}

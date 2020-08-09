import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  // Company Mappings
  public addCompany(company:Company){
    return this.httpClient.post<Company>("http://localhost:8080/admin/Company/" 
    + sessionStorage.token, company);
  }
  
  public getAllCompanies(){
    return this.httpClient.get<Company[]>("http://localhost:8080/admin/AllCompanies/"
    + sessionStorage.token);
  }

  public deleteCompany(compId:number){
    return this.httpClient.delete("http://localhost:8080/admin/"
    + sessionStorage.token + "/Company/" + compId);
  }

public getOneCompany(compId:number){
  return this.httpClient.get<Company>("http://localhost:8080/admin/"
  + sessionStorage.token + "/" + compId)
}

  public updateCompany(company:Company){
    return this.httpClient.put<Company>("http://localhost:8080/admin/"
    + sessionStorage.token + "/Company", company);
  }
  
  // Customer Mappings
  public addCustomer(customer:Customer){
    return this.httpClient.post<Customer>("http://localhost:8080/admin/"
    + sessionStorage.token +"/Customer", customer);
  }
  
  public deleteCustomer(custId:number){
    return this.httpClient.delete("http://localhost:8080/admin/"
    + sessionStorage.token + "/Customer/" + custId, {responseType:"text"});
  }

  public updateCustomer(customer:Customer){
    return this.httpClient.put<Customer>("http://localhost:8080/admin/"
    + sessionStorage.token + "/Customer", customer);
  }

  public getAllCustomers(){
    return this.httpClient.get<Customer[]>("http://localhost:8080/admin/"
    + sessionStorage.token +"/AllCustomers");
  }

  public getOneCustomer(custId:number){
    return this.httpClient.get<Customer>("http://localhost:8080/admin/"
    + sessionStorage.token + "/Customer/" + custId);
  }

}

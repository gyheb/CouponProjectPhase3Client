import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }

  // the only thing we're getting is token so response type can be text instead of default(Json)
  public login(email:string, password:string, type:string){
    return this.httpClient.post("http://localhost:8080/login/"+email+"/"+password+"/"+type,
    null, {responseType:"text"});
  }
}

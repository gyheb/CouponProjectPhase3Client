import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
     private fb:FormBuilder,
     private router:Router
     ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
      type: ['']
    });

  } // end of init

  public login(){
    this.loginService.login(this.loginForm.controls['email'].value,
    this.loginForm.controls['password'].value,
     this.loginForm.controls['type'].value).subscribe(
       tokenFromServer => {
         sessionStorage.token = tokenFromServer;
         // navigate to component
         this.router.navigate([this.loginForm.controls['type'].value])
       }, err => {
         alert(err.error);
       });
  

  }


}// end of login component

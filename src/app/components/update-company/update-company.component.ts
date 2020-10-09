import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {

  updateCompanyForm: FormGroup;
  company:Company;
  compId;// = this.route.snapshot.params.compId;
  
  constructor(
    private fb:FormBuilder,
    private service: AdminService,
    private route: ActivatedRoute,
    private router:Router
    ) { }
    
    ngOnInit(): void {
      
      this.compId = this.route.snapshot.params.compId;
      // console.log("compid = " + this.compId)

      this.updateCompanyForm = this.fb.group({
        email: [],
        password: []
      });
      
    this.service.getOneCompany(this.compId).subscribe(
      c =>{ 
        // console.log(c)
        this.company = c
        this.updateCompanyForm.controls['email'].setValue(c.email)
        this.updateCompanyForm.controls['password'].setValue(c.password)
    }, err => alert(err.error)
    );

  }

  public updateComapny(){
    this.company.email = this.updateCompanyForm.controls['email'].value;
    this.company.password = this.updateCompanyForm.controls['password'].value;
    this.service.updateCompany(this.company).subscribe(
      response=> { 
        alert(response)
        this.router.navigate(['admin']);
      }, err => alert (err.error)
      );
  }


}

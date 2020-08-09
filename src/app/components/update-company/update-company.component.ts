import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {

  updateCompanyForm: FormGroup;
  company:Company;

  constructor(
    private fb:FormBuilder,
    private service: AdminService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.updateCompanyForm = this.fb.group({
      email: [],
      password: []
    });

    this.service.getOneCompany(this.route.snapshot.params['compId']).subscribe(
      c =>{ 
        this.company = c
        this.updateCompanyForm.controls['email'].setValue[c.email]
        this.updateCompanyForm.controls['password'].setValue[c.password]
    }, err => alert(err.error)
    );

  }

  public updateComapny(){
    this.service.updateCompany(this.company).subscribe();
  }


}

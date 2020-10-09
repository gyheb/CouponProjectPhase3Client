import { Component, OnInit, ɵConsole } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryType } from 'src/app/models/category-type';
import { Coupon } from 'src/app/models/coupon';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.css']
})
export class UpdateCouponComponent implements OnInit {
  
  updateCouponForm: FormGroup;
  categories:String[]=[];
  coupon:Coupon;
  coupId;
  
  constructor(
    private fb:FormBuilder,
    private service:CompanyService,
    private route:ActivatedRoute,
    private router:Router
    ) { }
    
    ngOnInit(): void {
      
      this.coupId = this.route.snapshot.params.coupId;
      //  console.log("coupid = " + this.coupId)
      
      this.updateCouponForm = this.fb.group({
        type: ["", Validators.required],
        title: ["", Validators.required],
        description: [],
        startDate: ["", Validators.required],
        endDate: ["", [Validators.required, this.valiDate]],
        amount: ["", [Validators.required, Validators.min(1)]],
        price: ["", [Validators.required, Validators.min(0)]],
        image: []
      })
      
    
    this.service.getOneCoupon(this.coupId).subscribe(
      coup => {
        // Adds company back to coupon because @JsonIgnore
        this.service.getCompanyFromCoupon(this.coupId).subscribe(
          comp => {
            coup.company = comp;
          }, err => alert(err.error)
          );
          
          // adds customers back to coupon because @JsonIgnore
          this.service.getCustsFromCoupon(this.coupId).subscribe(
            custs => {
              this.coupon.customers = custs;
            }, err => alert(err.error)
            );
            
            // saves the coupon to class level variable
            this.coupon = coup;
            
            // pre-populates the form fields with the coupon values
            this.updateCouponForm.controls['type'].setValue(coup.type);
            this.updateCouponForm.controls['title'].setValue(coup.title);
            this.updateCouponForm.controls['description'].setValue(coup.description);
            this.updateCouponForm.controls['startDate'].setValue(coup.startDate);
            this.updateCouponForm.controls['endDate'].setValue(coup.endDate);
            this.updateCouponForm.controls['amount'].setValue(coup.amount);
            this.updateCouponForm.controls['price'].setValue(coup.price);
            this.updateCouponForm.controls['image'].setValue(coup.image);
          }, err=>{alert(err.error)}
          );
          
           // fills the categories list from the enum
          for(let c in CategoryType){this.categories.push(c)};


          
        } // the end of onInit
        
         updateCoupon() {
          this.coupon.type = this.updateCouponForm.controls['type'].value;
          this.coupon.title = this.updateCouponForm.controls['title'].value;
          this.coupon.description = this.updateCouponForm.controls['description'].value;
          this.coupon.startDate = this.updateCouponForm.controls['startDate'].value;
          this.coupon.endDate = this.updateCouponForm.controls['endDate'].value;
          this.coupon.amount = this.updateCouponForm.controls['amount'].value;
          this.coupon.price = this.updateCouponForm.controls['price'].value;
          this.coupon.image = this.updateCouponForm.controls['image'].value;
          this.service.updateCoupon(this.coupon).subscribe(
            response => {
              alert(response)
              this.router.navigate(['company']);
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

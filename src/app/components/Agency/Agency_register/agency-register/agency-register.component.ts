import { Component , OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { Dataservice } from 'src/app/Service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agency-register',
  templateUrl: './agency-register.component.html',
  styleUrls: ['./agency-register.component.scss']
})
export class AgencyRegisterComponent implements OnInit {


  Agency_register :FormGroup;


  constructor (public ds:Dataservice , public fb:FormBuilder , private router: Router ,  public toster:ToastrService){

}


ngOnInit(): void {

  this.Agency_register = this.fb.group({
    name: ['', Validators.required], // Required validator for name
    email: ['', [Validators.required, Validators.email]], // Required and email validators for email
    state: ['', Validators.required], // Required validator for state
    district: ['', Validators.required], // Required validator for district
    pin_code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]], // Required and pattern validator for pin_code (6-digit number)
    agencytype: ['', Validators.required], // Required validator for agencytype
    gst_no: ['', []],
    UserId:[]
    });
}

register(): void {
  if (this.Agency_register.valid) {

    this.Agency_register.patchValue({UserId:this.ds.loggined_user_id})

    this.ds.add_a_new_agency(this.Agency_register.value).subscribe(result => {
      console.log('Result', result);

      if (result.message == 'Agency added successfully') {

        console.log("Agency add success");
        
        this.toster.success("Agency added successfully", "Success");

        this.router.navigate(['../Agency_verification'])
      }
       else {
        console.log("agency add eeroos");
        
        this.toster.error("Agency already exists", "Error");
      }
    });
  }
}


}







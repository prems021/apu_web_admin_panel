import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dataservice } from 'src/app/Service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register-phone',
  templateUrl: './register-phone.component.html',
  styleUrls: ['./register-phone.component.scss']
})
export class RegisterPhoneComponent implements OnInit {

  registrationForm: FormGroup;
  otpInputVisible = false;
  isNextButtonClicked: boolean = false;
  password_form: FormGroup;
  isvalidbuttonClicked: boolean = false;
  generate_new_otp: boolean = false;
  isvalidateButtonClicked: boolean = true;




  constructor(public ds: Dataservice, public fb: FormBuilder, private router: Router, public toaster: ToastrService) {

  }


  ngOnInit(): void {
    // Initialize the form with validation rules
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Example: Require 10 digits
      otp: ['']



    });

    // password form section

    this.password_form = this.fb.group({

      password : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required]],
      phone :['', [Validators.required, Validators.pattern(/^\d{10}$/)]]

    }, { validator: this.passwordMatchValidator })


  }



  // Custom validator for password matching
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    if (password === confirmPassword) {
      return null; // Passwords match
    } else {
      return { passwordMismatch: true }; // Passwords do not match
    }
  }


  toggleAdditionalInput() {
    if (this.registrationForm.valid) {
      this.ds.register_with_ph_and_otp(this.registrationForm.value).subscribe(result => {
        console.log('Result', result);



        if (result.success == true) {
          this.isvalidateButtonClicked = false;
          this.isNextButtonClicked = true;
          this.otpInputVisible = true;
          this.toaster.success("otp sent in your verifying number")
          console.log("otp sent");

        }

        else {

          this.toaster.error("phone number alredy used")
          console.log("phone number alredy used");

        }

      },)
    }
  }



  otp_validate() {
    if (this.registrationForm.valid) {
      this.ds.valiadte_otp(this.registrationForm.value).subscribe(otp => {
        console.log('otp result', otp);



        if (otp.success) {
          this.toaster.success("OTP is verifyed")
          console.log("otp validated success");

        this.password_form.controls['phone'].setValue(this.registrationForm.controls['phone'].value )    

        this.isvalidbuttonClicked = true;

        }
        else {


          if (otp.message == 'Otp Expired') {

            this.registrationForm.controls['otp'].setValue(null)
            this.generate_new_otp = true;
            this.isNextButtonClicked = false;
            this.toaster.error("OTP expire and send Another otp")
          }

          if (otp.message == 'Invalid Otp')
            this.toaster.error("OTP is Invalid")
          console.log("otp Invalid");
          this.registrationForm.controls['otp'].setValue(null)

        }


      }
      )
    }
  }
  resend_otp() {
    if (this.registrationForm.valid) {
      this.ds.generate_new_otp(this.registrationForm.value).subscribe(rsend_otp => {
        console.log("resend otp success", rsend_otp);


        if (rsend_otp.message = 'otp sent to phone') {

          this.isNextButtonClicked = true;
          this.generate_new_otp = false;


        }
      }




      )

    }
  }



  passwordConfirm():void {

  
    
    if (this.password_form.valid) {
      this.ds.password_set(this.password_form.value).subscribe(result => {
        console.log("password success", result);

        if (result.success) {
          
          this.toaster.success("password added success")

          this.router.navigate(['./UserLogin'])
        }
        else{
          this.toaster.error("password added error")
        }
        
      })}
}

}

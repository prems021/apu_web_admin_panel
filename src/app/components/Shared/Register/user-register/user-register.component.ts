import { Component,OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { Dataservice } from 'src/app/Service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  update_form : FormGroup;
  updatedetails:any = []
  
 
  constructor (public ds:Dataservice , public fb:FormBuilder , public toster:ToastrService , private router:Router , public ps:NgxPermissionsService){

  }

  ngOnInit(): void {


    this.update_form = this.fb.group({
      // name: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
  // phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
  // password: ['', [Validators.required, Validators.minLength(8)]]
    });


  }

  

  // input number method
onPhoneNumberInput(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  let inputValue = inputElement.value // Remove non-digit characters
  inputValue = inputValue.slice(0, 10); // Restrict to 10 digits
  inputElement.value = inputValue; // Update the input value
}

update(){

  this.ds.update_user(this.ds.loggined_user_id , this.update_form.value).subscribe
  ((result:any)=>{
    console.log(result ,"profile updated");

    if(result.success == true){
      this.router.navigate(['./Dashboard'])
      this.ps.loadPermissions(['Update_user'])
    }
    else{
      this.ps.loadPermissions(['User'])
    }

  })
  }

}
import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { Dataservice } from 'src/app/Service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';



@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']


  
})


export class UserLoginComponent implements OnInit {

  login_form : FormGroup;



  constructor (public ds:Dataservice , public fb:FormBuilder , public toster:ToastrService , private router: Router , public ps:NgxPermissionsService){

}
  ngOnInit(): void {
    
    this.login_form = this.fb.group({
      phone: ['8078247164', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['12345678', [Validators.required, Validators.minLength(8),]]  
    });
  
}

Sign_in(){

  this.ds.user_login(this.login_form.controls['phone'].value,this.login_form.controls['password'].value).subscribe(result =>{
    console.log('response  login',result);
    
    if(result.success == true){
       this.ds.loggined_user_id  = result.data.id
      this.toster.success("Sign in success" , "success");
      
      if(result.is_agent==true){
        this.ds.Agency_id = result.agency.id;
        this.ps.loadPermissions(['Agency'])
        this.ds.get_all_service_list_z();
      }
      else{
        this.ps.loadPermissions(['User'])
      }
      this.router.navigate(['./Dashboard']);



    }
    else{
      this.toster.error("wrong username or password" , "error")


    }

  })

}
}

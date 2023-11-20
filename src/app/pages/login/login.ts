import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';

import { DataService } from '../../services/data.service';
import { ApiService } from '../../services/api.service';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  private clientId: string = null;
  push_disabled_enter: number = 0;
  constructor(
    private cookieService: CookieService,
    private fb: FormBuilder,
    public ds: DataService,
    public api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private ps: NgxPermissionsService,
  ) {
    this.cookieService.set('clientId', 'xxx');
    this.clientId = this.cookieService.get('clientId');
    if (this.clientId == 'xxx') {
      console.log('not logged in');
    } else {
      this.router.navigate(['/dash/this.clientId']);
    }
  }

  ngOnInit(): void {
    this.push_disabled_enter = 1;
    addEventListener('offline', (e) => {
      this.toastr.error('Offline Check internet connection');
    });

    addEventListener('online', (e) => {
      this.toastr.success('Internet connection is Working');
    });

    // this.authService.logoutUser();
    // this.api.navtoken=false;
    this.loginForm = this.fb.group({
      USER_NAME: ['', [Validators.required]],
      PASSWORD: ['', Validators.required],
    });
  }
  onFormSubmit(login_dets: any) {
    console.log('jim');
    this.push_disabled_enter = 2;
    this.submitted = true;
    this.api.login(login_dets).subscribe((data) => {
      this.get_res_login(data);
    });
  }

  get_res_login(data: any) {
    console.log('data', data);
    if (data.success == true) {
      // this.clientId = data.token;
      // this.cookieService.set('clientId', this.clientId);
      // this.router.navigate(['/dash', this.clientId]);
      if (data.status == true) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', data.user.user_role);

        this.api.user = data.user;

        this.api.invo_head.com_id = data.user.com_id;
        this.api.invo_head.user_id = data.user.id;
        this.api.api_logo_url =
          'https://csweb.in/hb7-india-api/get_logo/' +
          this.api.invo_head.com_id.toLocaleString() +
          '_logo.jpg';
        console.log('api_logo', this.api.api_logo_url);
        this.api.invo_head.fy_id =
          data.user.hb7_company_detail.hb7_fy_strings[0].id;
        this.api.invo_head.default_invo_number_type =
          data.user.hb7_company_detail.default_invo_number_type;
        //   console.log('fy-id',this.api.invo_head.fy_id)

        this.api.Company_dets = data.user.hb7_company_detail;

        //   alert(data.msg + 'Hello ' + data.user.user_name);
        this.router.navigate(['invoice-dash']);
      }
    } else {
      this.push_disabled_enter = 3;
      setTimeout(() => {
        this.push_disabled_enter = 1;
      }, 3000);
    }
  }
}

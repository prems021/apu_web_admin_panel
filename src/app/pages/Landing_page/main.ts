import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ParamMap } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class LandingComponent implements OnInit {
  constructor(
    public api: ApiService,
    private router: Router,

    private toastr: ToastrService,
    private ps: NgxPermissionsService,
  ) {}
  jwt_token: string = 'GDEE';
  Agencycomplite = true;

  ngOnInit(): void {}

  fetchContent() {
    // this.api.get_a_invoice_detail(this.api.invoice_id).subscribe(
    //   (jsonData) => {
    //     //
    //   },
    //   (err) => console.error(err),
    // );
  }

  logout() {
    this.router.navigate(['/login']);
  }
}

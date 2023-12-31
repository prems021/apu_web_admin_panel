import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.html',
  styleUrls: ['./dash.scss'],
})
export class DashComponent implements OnInit {
  constructor(
    public api: ApiService,
    private router: Router,
    private ar: ActivatedRoute,
    private toastr: ToastrService,
    private ps: NgxPermissionsService,
  ) {}
  jwt_token: string = 'GDEE';

  ngOnInit(): void {
    this.ar.paramMap.subscribe((params: ParamMap) => {
      console.log(params);
    });
  }

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

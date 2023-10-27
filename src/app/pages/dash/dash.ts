import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';

import { DataService } from '../../services/data.service';
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
    private toastr: ToastrService,
    private ps: NgxPermissionsService,
  ) {}
  jwt_token: string = 'GDEE';
  ngOnInit(): void {}
}

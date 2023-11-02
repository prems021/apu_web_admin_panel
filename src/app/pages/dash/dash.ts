import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
    private ar: ActivatedRoute,
    private toastr: ToastrService,
    private ps: NgxPermissionsService,
  ) {}
  jwt_token: string = 'GDEE';

  defaultInvoiceNumbers = { a5: 3, a4: 2, mm80: 63, mm60: 45 };

  code_extracted: any;

  ngOnInit(): void {
    this.code_extracted = this.getNumberForInput('mm60');

    this.ar.paramMap.subscribe((params: ParamMap) => {
      console.log(params);
    });
  }

  // findNumberForCode(codeToFind: string): number | undefined {
  //   const match = this.defaultPrintFormat.find((format) =>
  //     format.startsWith(codeToFind + '-'),
  //   );
  //   if (match) {
  //     const parts = match.split('-');
  //     if (parts.length === 2) {
  //       return +parts[1]; // Convert the number part to a number
  //     }
  //   }
  //   return undefined; // Return undefined if the code is not found
  // }

  getNumberForInput(input: string): number | undefined {
    return this.defaultInvoiceNumbers[input];
  }
}

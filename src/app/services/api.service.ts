import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, shareReplay } from 'rxjs/operators';
import { User } from './model';
import { CookieService } from 'ngx-cookie-service';
import {
  Invoice_head,
  States,
  company_dets,
  Hb_trans,
  Invoice_items,
  items_tax,
} from './model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private authToken = 'your-token-here';
  public invoice_id: number = 24018;
  floor: number = 0;
  frac: number = 0;
  figure_grand: string = '';
  state_name: string = 'Kerala';
  state_code: string = '32';
  public Trans_dets: Hb_trans[] = [];
  total_qty: number = 0;
  mrp_total: number = 0;
  public api_logo_url: string;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
    // this.showModal = 'none';
    // this.displayModal = 'none';
  }

  private createHeaders(): HttpHeaders {
    this.authToken = this.cookieService.get('clientId');
    return new HttpHeaders({
      'Content-Type': 'application/json', // Set the 'Content-Type' to JSON
      Authorization: `${this.authToken}`, // Set the token in the 'Authorization' header
    });
  }

  public user: User = {
    id: 1,
    name: 'John Doe',
    mob_no: '123-456-7890',
    org_branch: {
      org: {
        id: 1000,
        org_name: 'Acme Corp',
        address: '123 Main St, City, Country',
      },
      branch_id: 200,
      branch_name: 'Main Branch',
      fy_id: 2023,
    },
    role: 'counter-user',
  };

  private postUrl = 'https://csweb.in/hb7-india-api/post/';
  private cUrl = 'https://csweb.in/hb7-india-api/';
  private adminUrl = 'https://csweb.in/hb7-india-api/admin/';

  private testurl = 'https://nxvgu-9001.csb.app/hb9-india-api';

  login(model: any) {
    let body = JSON.stringify(model);
    console.log(body);
    return this.http
      .post(this.adminUrl + '/user_login', body, this.httpOptions)
      .pipe(
        catchError(
          this.handleError<any>('login', {
            success: false,
            msg: 'Offline..Check internet status',
          }),
        ),
      );
  }

  get_a_invoice_detail(id: number) {
    const url = `${this.cUrl + 'get_a_invoice_detail'}/${id}`;
    return this.http
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError<any>('get_a_invoice_detail')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

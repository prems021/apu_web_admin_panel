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
} from './model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private authToken = 'your-token-here';
  public invoice_id: number = 0;
  floor: number = 0;
  frac: number = 0;
  figure_grand: string = '';
  state_name: string = 'Kerala';
  state_code: string = '32';
  public Trans_dets: Hb_trans[] = [];
  total_qty: number = 0;
  mrp_total: number = 0;
  public api_logo_url: string;
  public Invoice_items_ary: Invoice_items[] = [];

  public state_list: States[] = [
    { state_name: 'Jammu and Kashmir', state_code: '01', alpha_code: 'JK' },
    { state_name: 'Himachal Pradesh', state_code: '02', alpha_code: 'HP' },
    { state_name: 'Punjab', state_code: '03', alpha_code: 'PB' },
    { state_name: 'Chandigarh', state_code: '04', alpha_code: 'CH' },
    { state_name: 'Uttarakhand', state_code: '05', alpha_code: 'UA' },
    { state_name: 'Haryana', state_code: '06', alpha_code: 'HR' },
    { state_name: 'Delhi', state_code: '07', alpha_code: 'DL' },
    { state_name: 'Rajasthan', state_code: '08', alpha_code: 'RJ' },
    { state_name: 'Uttar Pradesh', state_code: '09', alpha_code: 'UP' },
    { state_name: 'Bihar', state_code: '10', alpha_code: 'BR' },
    { state_name: 'Sikkim', state_code: '11', alpha_code: 'SK' },
    { state_name: 'Arunachal Pradesh', state_code: '12', alpha_code: 'AR' },
    { state_name: 'Nagaland', state_code: '13', alpha_code: 'NL' },
    { state_name: 'Manipur', state_code: '14', alpha_code: 'MN' },
    { state_name: 'Mizoram', state_code: '15', alpha_code: 'MZ' },
    { state_name: 'Tripura', state_code: '16', alpha_code: 'TR' },
    { state_name: 'Meghalaya', state_code: '17', alpha_code: 'ML' },
    { state_name: 'Assam', state_code: '18', alpha_code: 'AS' },
    { state_name: 'West Bengal', state_code: '19', alpha_code: 'WB' },
    { state_name: 'Jharkhand', state_code: '20', alpha_code: 'JH' },
    { state_name: 'Odisha', state_code: '21', alpha_code: 'OR' },
    { state_name: 'Chhattisgarh', state_code: '22', alpha_code: 'CG' },
    { state_name: 'Madhya Pradesh', state_code: '23', alpha_code: 'MP' },
    { state_name: 'Gujarat', state_code: '24', alpha_code: 'GJ' },
    { state_name: 'Daman and Diu', state_code: '25', alpha_code: 'DD' },
    {
      state_name: 'Dadra and Nagar Haveli',
      state_code: '26',
      alpha_code: 'DN',
    },
    { state_name: 'Maharashtra	', state_code: '27', alpha_code: 'MH' },
    { state_name: 'Karnataka', state_code: '29', alpha_code: 'KA' },
    { state_name: 'Goa', state_code: '30', alpha_code: 'GA' },
    { state_name: 'Lakshadweep', state_code: '31', alpha_code: 'LD' },
    { state_name: 'Kerala', state_code: '32', alpha_code: 'KL' },
    { state_name: 'Tamil Nadu', state_code: '33', alpha_code: 'TN' },
    { state_name: 'Puducherry', state_code: '34', alpha_code: 'PY' },
    {
      state_name: 'Andaman and Nicobar Islands',
      state_code: '35',
      alpha_code: 'AN',
    },
    { state_name: 'Telangana', state_code: '36', alpha_code: 'TS' },
    { state_name: 'Andhra Pradesh', state_code: '37', alpha_code: 'AP' },
    { state_name: 'Ladakh', state_code: '38', alpha_code: 'LA' },
    { state_name: 'Other Territory', state_code: '97', alpha_code: 'OT' },
    { state_name: 'Centre Jurisdiction', state_code: '99', alpha_code: 'CJ' },
  ];

  public Company_dets: company_dets = {
    company_address_1: '',
    company_address_2: '',
    company_email: '',
    company_gstin: '',
    company_name: '',
    company_ph_1: '',
    company_ph_2: '',
    company_street: '',
    createdAt: '',
    updatedAt: '',
    company_bank_name: '',
    company_bank_ac_no: '',
    company_bank_branch_name: '',
    company_bank_ifsc_code: '',
    default_print_type: 1,
    default_print_type_80mm: 1,
    default_print_size: 'a4',
    default_invo_number_type: 1,

    hb7_fy_strings: [
      {
        id: 0,
        com_id: 0,
        fy_string: '',
        is_default: true,
      },
    ],
  };
  public invo_head: Invoice_head = {
    idx: 0,
    com_id: 0,
    fy_id: 0,
    cus_id: 0,
    type: '',
    type_ex: '',
    prefix_string: '',
    cast: 0,
    mode: '',
    status: 0,
    user_id: 0,
    counter_no: 0,
    invoice_no: 0,
    invoice_no_pur: null,
    invoice_date: '',
    total_taxable: 0,
    total_tax_amt: 0,
    grand_amt: 0,
    round_off: 0,
    discount_amt: 0,
    paid_amt: 0,
    mode_of_pay: 1,
    recieved_amt: 0,
    balance_amt: 0,
    due_amt: 0,
    white_flag: 0,
    invoice_no_genrated: 0,
    customer_Name: 'Cash',
    customer_Address_1: '',
    customer_Address_2: '',
    customer_Address_3: '',
    customer_Gstin: '',
    customer_Ph1: '',
    customer_Ph2: '',
    customer_Email: '',
    pos: '',
    lpo_no: '',
    mode_of_supply: '',
    bundles: 0,
    pre_cash_total: 0,
    default_invo_number_type: 0,
    ref_invoice_number: '',
    ref_invoice_date: '',
    invoice_uid_genrated: 0,
    invoice_created_at: new Date(),
  };
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

  // get_all_products_under_a_branch(): Observable<any[]> {
  //   const headers = this.createHeaders();
  //   const url = `${this.testurl + '/admin/get_all_products_under_a_branch'}`;
  //   return this.http
  //     .get<any>(url, { headers })
  //     .pipe(
  //       catchError(this.handleError<any>('get_all_products_under_a_branch')),
  //     );
  // }

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

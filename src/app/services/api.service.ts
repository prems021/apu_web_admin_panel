import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, shareReplay } from 'rxjs/operators';
import { User } from './model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private authToken = 'your-token-here';
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
      .post(this.testurl + '/user_login', body, this.httpOptions)
      .pipe(
        catchError(
          this.handleError<any>('login', {
            success: false,
            msg: 'Offline..Check internet status',
          }),
        ),
      );
  }

  get_all_products_under_a_branch(): Observable<any[]> {
    const headers = this.createHeaders();
    const url = `${this.testurl + '/admin/get_all_products_under_a_branch'}`;
    return this.http
      .get<any>(url, { headers })
      .pipe(catchError(this.handleError<any>('get_all_products_under_a_branch')));
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

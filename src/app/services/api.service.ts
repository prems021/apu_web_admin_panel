import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, shareReplay } from 'rxjs/operators';
import { User } from './model';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    // this.showModal = 'none';
    // this.displayModal = 'none';
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

  login(model: any) {
    let body = JSON.stringify(model);
    console.log(body);
    return this.http
      .post(this.adminUrl + 'user_login', body, this.httpOptions)
      .pipe(
        catchError(
          this.handleError<any>('login', {
            success: false,
            msg: 'Offline..Check internet status',
          }),
        ),
      );
  }

  get_all_invoices(): Observable<any[]> {
    const url = `${this.cUrl + 'get_all_invoices'}/${
      this.user.org_branch.branch_id
    }/${this.user.org_branch.fy_id}`;
    return this.http
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError<any>('get_all_invoices')));
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

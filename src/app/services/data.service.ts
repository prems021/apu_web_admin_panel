import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// import { items_tax,figure } from './model';
// import { invoice_head,invoice_varibs,invoice_master,invoice_tails,company_dets } from './model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public navtoken: boolean = false;
  public showModal: string;
  public displayModal: string;
  public edit_mode: boolean = false;

  // Tax_info = new items_tax(1,[]);

  //   user_id : number;
  //   user_role : string;
  //   post_demo : any = {invo_string : "",is_b2b:false,com_id:null,e_no:0}
  //   report_demo : any = {report_type : "",from_date:'',to_date:'',e_no:0}

  com_id: number = 1;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    this.showModal = 'none';
    this.displayModal = 'none';
  }

  getData() {
    return this.http.get('/assets/config.json');
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

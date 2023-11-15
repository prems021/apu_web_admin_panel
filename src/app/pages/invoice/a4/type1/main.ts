import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  Input,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { view_invoices } from '../../../../services/model';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'invoice_print_a4_type_1',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Invoice_print_a4_type_1 implements OnInit {
  loaded: boolean = false;
  mData: view_invoices[] = [];
  filteredData: view_invoices[] = [];
  public selected = -1;
  page_count: number = 1;

  @Input('ia') len: number;
  @Input('print') print: boolean;

  public Options = [
    { name: 'B2C', op: 2 },
    { name: 'B2B', op: 3 },
  ];

  constructor(
    public api: ApiService,
    private rs: Router,
    private ar: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    //   this.get_bills();
    // this.ar.paramMap.subscribe((params: ParamMap) => {
    //   console.log(params);
    // });
    // this.ar.queryParams.subscribe((params) => {
    //   const token = params['key1'];
    //   console.log(token);
    // const bytes = CryptoJS.AES.decrypt(token, key);
    // const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    // console.log('data2', decrypted);
    // Use the values as needed
    // });
  }
  fetchContent()
  {
    this.get_bills();
  }
  async ngOnChanges(changes: SimpleChanges) {
    if (this.len > 21) {
      console.log('prri..inside..', this.print);
      this.page_count = 1;

      if (this.print == true) {
        console.log('page..inside..', this.page_count);

        setTimeout(() => {
          console.log(' 1  .inside..', this.page_count);
          window.print();
          this.page_count = 2;
        }, 400);
        console.log('2  inside..', this.page_count);
        setTimeout(() => {
          console.log('3 .inside..', this.page_count);
          window.print();
        }, 800);
        console.log('4..', this.page_count);
      }
    } else {
      this.page_count = 1;
      if (this.print == true) {
        setTimeout(() => {
          window.print();
        }, 400);
      }
    }
  }

  get_bills() {
    // this.api.get_all_products_under_a_branch().subscribe((data: any) => {
    //   console.log(data);
    //   const modifiedData = this.transformData(data);
    //   this.mData = modifiedData;
    //   this.filteredData = [...this.mData];
    // this.dataSource.data = modifiedData;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    //   this.loaded = true;
    // });
  }

  transformData(data: any): any[] {
    // Example transformation: Extracting relevant fields and modifying them
    const modifiedData = data.map((item: any) => {
      return {
        u_id: item.id,
        type: item.type,
        invoice_no: item.invoice_no,
        customer_name: item.hb7_customer.name,
        invoice_date: item.invoice_date,
        // Add more transformations as needed
      };
    });

    return modifiedData;
  }

  make_data(data: any) {}

  applyFilter(ev: any) {
    console.log(ev);
    const inputValue = (ev.target as HTMLInputElement).value;
    console.log(inputValue);
    this.filterData(inputValue);
  }

  filterData(searchText: string) {
    if (!searchText) {
      // If the search input is empty, show all data
      this.filteredData = [...this.mData];
    } else {
      // Filter mData based on the searchText
      this.filteredData = this.mData.filter((item) => {
        // Convert the search text to lowercase for case-insensitive matching
        const searchLower = searchText.toLowerCase();

        // Check if any property of the object matches the search text
        return Object.values(item).some((value) => {
          if (typeof value === 'string' || typeof value === 'number') {
            // If the property is a string or a number, convert it to a string
            const stringValue = value.toString().toLowerCase();
            return stringValue.includes(searchLower);
          }
          // Add additional checks for other data types if necessary
          return false;
        });
      });
    }
  }

  viewInvoice(row: view_invoices) {
    // Implement your logic to view the invoice
  }

  //  this.rs.navigate(['/home/update-invoice']);
}

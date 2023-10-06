import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { view_invoices } from '../../../services/model';
@Component({
  selector: 'app-view-invoice-bills',
  templateUrl: './view.html',
  styleUrls: ['./view.scss'],
})
export class View_Invoice_list implements OnInit {
  loaded: boolean = false;
  mData: view_invoices[] = [];
  filteredData: view_invoices[] = [];
  public selected = -1;

  public Options = [
    { name: 'B2C', op: 2 },
    { name: 'B2B', op: 3 },
  ];

  dataSource = new MatTableDataSource<view_invoices>(null); // Replace YourDataInterface with your actual data structure
  displayedColumns: string[] = ['u_id', 'type', 'invoice_no', 'view'];
  pageSize = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private api: ApiService,
    private rs: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.get_bills();
  }

  get_bills() {
    this.api.get_all_invoices().subscribe((data: any) => {
      console.log(data);
      const modifiedData = this.transformData(data);
      this.mData = modifiedData;
      this.filteredData = [...this.mData];
      // this.dataSource.data = modifiedData;
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      this.loaded = true;
    });
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

  make_data(data: any) {
    this.dataSource.data = data;
  }

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

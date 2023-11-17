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

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { view_invoices } from '../../../../services/model';

@Component({
  selector: 'invoice_print_a4_type_2',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Invoice_print_a4_type_2 implements OnInit {
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
  items: any[] = [
    { description: 'Item 1', quantity: 2, unitPrice: 20 },
    { description: 'Item 2', quantity: 1, unitPrice: 50 },
    // Add more items as needed
  ];
  constructor(
    public api: ApiService,
    private rs: Router,
    private ar: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {}

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
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('printSection') printSection: ElementRef;
  defaultInvoiceNumbers = { a5: 3, a4: 2, mm80: 63, mm60: 45 };
  CUS_MODEL: any;
  code_extracted: any;
  modelTypes: string[] = ['Type1', 'Type2', 'Type3', 'Type4'];
  print_size: string = 'a4';
  print_type: string = 'Type1';
  print: boolean = true;
  dummyData: any[] = Array.from({ length: 10 }, (_, index) => index + 1);
  pro_np: number;
  ia: number = 0;
  ka: number = 0;
  d_: number = 0;
  uu: number = 0;
  loop_var: number = 0;
  push_disabled_enter: number = 0;
  toogle_head_det: boolean = false;
  ngOnInit(): void {
    this.ar.paramMap.subscribe((params: ParamMap) => {
      console.log(params);
    });
  }

  fetchContent() {
    this.api.get_a_invoice_detail(this.api.invoice_id).subscribe(
      (jsonData) => {
        this.get_res_bil(jsonData);
      },
      (err) => console.error(err),
    );
  }

  printContent(): void {
    window.print();
  }

  get_res_bil(data: any) {
    console.log(data);
    this.api.invo_head.invoice_date = data.invoice_date;
    this.api.invo_head.invoice_no_genrated = data.invoice_no;
    this.api.invo_head.customer_Name = data.hb7_customer.name;
    this.api.invo_head.customer_Address_2 = data.hb7_customer.address_1;
    this.api.invo_head.customer_Address_3 = data.hb7_customer.address_2;
    this.api.invo_head.customer_Ph1 = data.hb7_customer.ph;
    this.api.invo_head.customer_Ph2 = data.hb7_customer.mob;
    this.api.invo_head.customer_Address_1 = data.hb7_customer.street;
    this.api.invo_head.customer_Gstin = data.hb7_customer.gst_in;

    if (this.api.invo_head.customer_Gstin == null) {
      this.api.invo_head.type_ex = 'B2C';
    } else {
      if (this.api.invo_head.customer_Gstin.length > 12) {
        if (data.hb7_customer.cast == 1) {
          this.api.invo_head.type_ex = 'B2B';
        }

        if (data.hb7_customer.cast == 2) {
          this.api.invo_head.type_ex = 'IGST';
        }

        if (data.hb7_customer.cast == 3) {
          this.api.invo_head.type_ex = 'SEZ';
        }
        if (data.hb7_customer.cast == 5) {
          this.api.invo_head.type_ex = 'INTL';
        }

        let result = this.api.invo_head.customer_Gstin.slice(0, 2);
        const msd = this.api.state_list.filter((xy) => xy.state_code == result);
        if (msd.length <= 0) {
          alert('invalid Gst codes');
        } else {
          this.api.state_code = msd[0].state_code;
          this.api.state_name = msd[0].state_name;
        }
      } else {
        this.api.invo_head.type_ex = 'B2C';
        let result = this.api.Company_dets.company_gstin.slice(0, 2);
        const msd = this.api.state_list.filter((xy) => xy.state_code == result);
        if (msd.length <= 0) {
          alert('invalid Gst codes');
        } else {
          this.api.state_code = msd[0].state_code;
          this.api.state_name = msd[0].state_name;
        }
      }
    }

    if (this.api.invo_head.customer_Gstin != null) {
      if (this.api.invo_head.customer_Gstin.length > 12) {
        let result = this.api.invo_head.customer_Gstin.slice(0, 2);
        const msd = this.api.state_list.filter((xy) => xy.state_code == result);
        if (msd.length <= 0) {
          alert('invalid Gst codes');
        } else {
          this.api.state_code = msd[0].state_code;
          this.api.state_name = msd[0].state_name;
        }
      } else {
        let result = this.api.Company_dets.company_gstin.slice(0, 2);
        const msd = this.api.state_list.filter((xy) => xy.state_code == result);
        if (msd.length <= 0) {
          alert('invalid Gst codes');
        } else {
          this.api.state_code = msd[0].state_code;
          this.api.state_name = msd[0].state_name;
        }
      }
    }

    this.api.invo_head.cast = data.cast;

    this.api.invo_head.customer_Email = data.hb7_customer.email;
    this.api.invo_head.cus_id = data.hb7_customer.id;
    this.api.invo_head.recieved_amt = 0;
    this.api.invo_head.pos = data.pos;
    this.api.invo_head.lpo_no = data.lpo_no;

    this.api.invo_head.mode_of_supply = data.mode_of_supply;
    this.api.invo_head.bundles = data.bundles;

    this.api.invo_head.due_amt = 0;

    this.api.invo_head.idx = data.id;
    this.CUS_MODEL = {
      id: data.hb7_customer.id,
      com_id: data.hb7_customer.com_id,
      gst_in: data.hb7_customer.gst_in,
      name: data.hb7_customer.name,
      street: data.hb7_customer.street,
      address_1: data.hb7_customer.address_1,
      address_2: data.hb7_customer.address_2,
      cast: data.hb7_customer.cast,
      createdAt: '2021-08-12T05:54:30.000Z',
      credit_balance: data.hb7_customer.credit_balance,
      email: data.hb7_customer.email,
      mob: data.hb7_customer.mob,
      opening_balance: data.hb7_customer.opening_balance,
      ph: data.hb7_customer.ph,
      type: data.hb7_customer.type,
      updatedAt: '2021-08-27T10:42:48.000Z',
    };

    for (var i = 0; i < data.hb7_invoice_details.length; i++) {
      this.pro_np =
        data.hb7_invoice_details[i].rate +
        (data.hb7_invoice_details[i].rate * data.hb7_invoice_details[i].tax) /
          100;
      this.pro_np = Math.round(this.pro_np * 100) / 100;

      this.stack_push(
        data.hb7_invoice_details[i].index_no,
        data.hb7_invoice_details[i].product_id,
        0,
        0,
        0,
        data.hb7_invoice_details[i].qty,
        data.hb7_invoice_details[i].rate,
        data.hb7_invoice_details[i].mrp,
        data.hb7_invoice_details[i].tax,
        data.hb7_invoice_details[i].Hb7_product.product_name,
        this.pro_np,
        data.hb7_invoice_details[i].product_description,
        data.hb7_invoice_details[i].Hb7_product.hsn_code,
        data.hb7_invoice_details[i].Hb7_product.hb7_unit.UQC_Code,
        data.hb7_invoice_details[i].id,
      );
    }
    this.ia = data.hb7_invoice_details.length;

    this.api.Trans_dets = [];

    var su = 0;
    for (this.uu = 0; this.uu < data.hb7_trans_masters.length; this.uu++) {
      this.api.Trans_dets.push({
        amount: data.hb7_trans_masters[this.uu].amount,
        cast: 'SALE',
        createdAt: data.hb7_trans_masters[this.uu].createdAt,
        ref_no: data.hb7_trans_masters[this.uu].ref_no,
        date: data.hb7_trans_masters[this.uu].date,
        serial_no: data.hb7_trans_masters[this.uu].serial_no,
        deletedAt: null,
        id: data.hb7_trans_masters[this.uu].id,
        is_bulk_pay: false,
        master_id: data.hb7_trans_masters[this.uu].master_id,
        mode: data.hb7_trans_masters[this.uu].mode,
        status: data.hb7_trans_masters[this.uu].status,
        type: 'CREDIT',
        updatedAt: data.hb7_trans_masters[this.uu].updatedAt,
      });
      su = su + data.hb7_trans_masters[this.uu].amount;
    }

    this.api.invo_head.pre_cash_total = this.api.invo_head.pre_cash_total + su;

    this.toogle_head_det = true;
    this.push_disabled_enter = 1;

    this.calculation();
  }

  calculation() {
    this.api.total_qty = 0;
    this.api.invo_head.total_taxable = 0;
    this.api.invo_head.total_tax_amt = 0;
    this.api.mrp_total = 0;

    for (this.loop_var = 0; this.loop_var < this.ia; this.loop_var++) {
      this.api.mrp_total =
        this.api.mrp_total + this.api.Invoice_items_ary[this.loop_var].mrp;
      this.api.total_qty =
        this.api.total_qty + this.api.Invoice_items_ary[this.loop_var].qty;

      this.d_ =
        ((this.api.Invoice_items_ary[this.loop_var].rate *
          this.api.Invoice_items_ary[this.loop_var].tax) /
          100) *
        this.api.Invoice_items_ary[this.loop_var].qty;

      this.api.invo_head.total_tax_amt =
        this.api.invo_head.total_tax_amt + this.d_;

      this.api.invo_head.total_taxable =
        this.api.invo_head.total_taxable +
        this.api.Invoice_items_ary[this.loop_var].rate *
          this.api.Invoice_items_ary[this.loop_var].qty;
    }

    this.api.invo_head.total_taxable =
      Math.round(this.api.invo_head.total_taxable * 100) / 100;

    this.api.mrp_total = Math.round(this.api.mrp_total * 100) / 100;

    this.api.invo_head.grand_amt =
      this.api.invo_head.total_taxable + this.api.invo_head.total_tax_amt;

    this.api.invo_head.grand_amt =
      Math.round(this.api.invo_head.grand_amt * 100) / 100;

    this.api.floor = Math.floor(this.api.invo_head.grand_amt);

    this.api.frac = this.api.invo_head.grand_amt - this.api.floor;

    if (this.api.frac > 0.49) {
      this.api.frac = 1 - this.api.frac;
      this.api.floor = this.api.floor + 1;
    }
    this.api.frac = Math.round(this.api.frac * 100) / 100;

    this.api.invo_head.grand_amt = this.api.floor;

    this.api.invo_head.due_amt =
      this.api.invo_head.grand_amt - this.api.invo_head.pre_cash_total;
    if (this.api.invo_head.due_amt > 0) {
      this.api.invo_head.balance_amt = 0;
    } else {
      this.api.invo_head.balance_amt =
        this.api.invo_head.pre_cash_total - this.api.invo_head.grand_amt;
    }
  }

  stack_push(
    index_no: number,
    pro_id: number,
    batch_id: number,
    free_qty: number,
    master_id: number,
    qty: number,
    rate: number,
    mrp: number,
    tax: number,
    pro_name: string,
    pro_np: number,
    pro_desc: any,
    hsn: string,
    unit: string,
    idx: number,
  ) {
    this.api.Invoice_items_ary.push({
      index_no: index_no,
      product_id: pro_id,
      batch_id: batch_id,
      free_qty: free_qty,
      master_id: master_id,
      qty: qty,
      rate: rate,
      mrp: mrp,
      tax: tax,
      product_name: pro_name,
      unit: unit,
      value: pro_np,
      product_description: pro_desc,
      hsn_code: hsn,
      idx: idx,
    });
  }
}

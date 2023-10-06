export interface User {
  id: number;
  name: string;
  mob_no: string;
  org_branch: Org_branch;
  role: string;
}

export interface Org_branch {
  org: Org;
  branch_id: number;
  branch_name: string;
  fy_id: number;
}

export interface Org {
  id: number;
  org_name: string;
  address: string;
}

export interface view_invoices {
  u_id: number;
  type: string;
  invoice_no: number;
  customer_name : string;
  invoice_date : string;
}

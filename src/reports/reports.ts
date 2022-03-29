// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import Quickbooks from "../quickbooks";

export interface FECRowColData {
  id?: string;
  value: string;
  href?: string;
}

export interface FECRowColumn {
  ColType: "Account" | "Money";
  ColTitle?: string;
  MetaData?: {
    Name?: string;
    Value: string;
  }
}

export interface FECRow {
  type: "Data" | "Section";
  ColData: FECRowColData[];
  Summary?: any;
  Rows?: any;
  Header?: any;
}

export interface FEC {
  Header: {
    Customer?: string;
    ReportName?: string;
    Vendor?: string;
    Options?: {
      Name?: string;
      Value?: string;
    }
    Item?: string;
    Employee?: string;
    ReportBasis?: "Cash" | "Accrual";
    StartPeriod?: string;
    Class?: string;
    Currency?: string;
    EndPeriod?: string;
    Time?: string;
    Department?: string;
    SummarizeColumnsBy?: string;
  },
  Rows: {
    Row: FECRow;
  },
  Columns: {
    Column: FECRowColumn[];
  }
}

export interface FECReportOptions {
  attachment?: "TEMPORARY" | "NONE";
  withQboIdentifier?: boolean;
  start_date: string;
  end_date?: string;
  add_due_date?: boolean;
}

export class Reports {
  private quickbooks: Quickbooks;

  constructor(quickbooks: Quickbooks) {
    this.quickbooks = quickbooks;
  }

  async FEC(options?: FECReportOptions) {
    const url = this.quickbooks.getURLFor("reports/FECReport", options);

    const { data } = await httpie.get<FEC[]>(
      url,
      {
        headers: {
          ...this.quickbooks.requestHeader,
          "Content-Type": "application/json"
        }
      }
    );

    return data;
  }
}

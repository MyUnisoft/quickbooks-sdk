// Require Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Require Internal Dependencies
import Quickbooks from "../quickbooks";

type ReportBasisEnum = "Cash" | "Accrual";

interface FecRowColData {
  id?: string;
  value: string;
  href?: string;
}


type ColumnTypeEnum = "Account" | "Money";
interface FecRowColumn {
  ColType: ColumnTypeEnum;
  ColTitle?: string;
  MetaData?: {
    Name?: string;
    Value: string;
  }
}

interface FecRow {
  type: "Data" | "Section";
  ColData: FecRowColData[];
  Summary?: any;
  Rows?: any;
  Header?: any;
}

interface FEC {
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
    ReportBasis?: ReportBasisEnum;
    StartPeriod?: string;
    Class?: string;
    Currency?: string;
    EndPeriod?: string;
    Time?: string;
    Department?: string;
    SummarizeColumnsBy?: string;
  },
  Rows: {
    Row: FecRow;
  },
  Columns: {
    Column: FecRowColumn[];
  }
}


type attachmentEnum = "TEMPORARY" | "NONE";

interface FECReportOptions {
  attachment?: attachmentEnum;
  withQboIdentifier?: boolean;
  start_date: string;
  end_date?: string;
  add_due_date?: boolean;
}

export class Reports {
  private quickbooks: Quickbooks;

  // public FEC: FEC;

  constructor(quickbooks: Quickbooks) {
    this.quickbooks = quickbooks;

    // this.FEC = new FEC(this);
  }

  async FEC(options?: FECReportOptions) {
    const url = this.quickbooks.getURLFor("reports/FECReport", options);

    console.log(url);

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

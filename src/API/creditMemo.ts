import API from "./API";

// Require Internal Dependencies
import * as QB from "../type";
import Quickbooks from "..";

interface ICreditMemo extends QB.RootEntityProperties {
  RemainingCredit: number;
  CustomField: QB.CustomField[];
  TxnDate: string;
  DepartmentRef: QB.Reference;
  CurrencyRef: QB.Reference;
  Line: QB.InvoiceLine[];
  TxnTaxDetail: {
    TotalTax: number;
    TxnTaxCodeRef?: QB.Reference;
    TaxLine: QB.TaxLine[];
  };
  TransactionLocationType: "WithinFrance" | "FranceOverseas" | "OutsideFranceWithEU" | "OutsideEU";
  CustomerRef: QB.Reference;
  BillAddr: QB.Addr;
  ClassRef: QB.Reference;
  GlobalTaxCalculation: string;
  TotalAmt: number;
  PrintStatus: string;
  EmailStatus: string;
  BillEmail: {
    Address: string;
  };
  Balance: number;
  DiscountAmt: number;
}

export default class CreditMemo extends API<ICreditMemo> {
  constructor(parent: Quickbooks) {
    super(parent, {
      entityName: "creditMemo"
    });
  }
}

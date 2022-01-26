import API from "./API";

// Require Internal Dependencies
import * as QB from "../type";
import Quickbooks from "..";

interface InvoiceLinkedTxn {
  TxnId: string;
  TxnLineId?: string;
  TxnType: "Estimate" | "TimeActivity" | "PurchaseOrder" | "BillPaymentCheck";
}

export interface IInvoice extends QB.RootEntityProperties {
  AllowIPNPayment: boolean;
  AllowOnlinePayment: boolean;
  AllowOnlineCreditCardPayment: boolean;
  AllowOnlineACHPayment: boolean;
  CustomField: QB.CustomField[];
  TxnDate: string;
  DepartmentRef: QB.Reference;
  CurrencyRef: QB.Reference;
  LinkedTxn: InvoiceLinkedTxn[];
  Line: QB.InvoiceLine[];
  TxnTaxDetail: {
    TotalTax: number;
    TxnTaxCodeRef?: QB.Reference;
    TaxLine: QB.TaxLine[];
  };
  TransactionLocationType: "WithinFrance" | "FranceOverseas" | "OutsideFranceWithEU" | "OutsideEU";
  // Reference to a Customer Entity
  CustomerRef: QB.Reference;
  BillAddr: QB.Addr;
  ShipAddr?: QB.Addr;
  FreeFormAddress: boolean;
  SalesTermRef: QB.Reference;
  DueDate: string;
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

export default class Invoice extends API<IInvoice> {
  constructor(parent: Quickbooks) {
    super(parent, {
      entityName: "invoice"
    });
  }
}

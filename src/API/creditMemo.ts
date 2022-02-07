import API from "./API";

// Require Internal Dependencies
import * as QB from "../type";
import Quickbooks from "../quickbooks";

interface ICreditMemo extends QB.RootEntityProperties {
  Line: QB.InvoiceLine[];
  CustomerRef: QB.Reference;
  CurrencyRef?: QB.Reference;
  BillEmail?: {
    Address?: string;
  };
  TxnDate?: string;
  CustomField?: QB.CustomField[];
  ClassRef?: QB.Reference;
  PrintStatus?: string;
  SalesTermRef?: QB.Reference;

  GlobalTaxCalculation?: QB.GlobalTaxCalculationEnum;
  TotalAmt?: string;
  InvoiceRef?: QB.Reference;
  TransactionLocationType?: "WithinFrance" | "FranceOverseas" | "OutsideFranceWithEU" | "OutsideEU";
  ApplyTaxAfterDiscount?: boolean;
  DocNumber?: string;
  PrivateNote?: string;
  CustomerMemo?: string;
  TxnTaxDetail?: QB.TxnTaxDetail;
  PaymentMethodRef?: QB.Reference;
  ExchangeRate?: number;
  ShipAddr?: QB.Addr;
  DepartmentRef?: QB.Reference;
  EmailStatus?: string;
  BillAddr?: QB.Addr;
  HomeBalance?: number;
  RemainingCredit?: number;
  RecurDataRef?: QB.Reference;
  TaxExemptionRef?: QB.Reference;
  Balance?: number;
  HomeTotalAmt?: number;
}

export class CreditMemo extends API<ICreditMemo> {
  constructor(parent: Quickbooks) {
    super(parent, {
      entityName: "creditMemo"
    });
  }
}

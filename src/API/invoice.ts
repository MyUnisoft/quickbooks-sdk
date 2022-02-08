import API from "./API";

// Require Internal Dependencies
import * as QB from "../type";
import Quickbooks from "../quickbooks";

interface InvoiceLinkedTxn {
  TxnId: string;
  TxnLineId?: string;
  TxnType: "Estimate" | "TimeActivity" | "PurchaseOrder" | "BillPaymentCheck";
}

export interface IInvoice extends QB.RootEntityProperties {
  Line: QB.InvoiceLine[];
  CustomerRef: QB.Reference;
  CurrencyRef?: QB.Reference;
  DocNumber?: string;
  BillEmail?: {
    Address?: string;
  };
  TxnDate: string;
  ShipFromAddr?: QB.Addr;
  ShipDate?: string;
  TrackingNum?: number;
  ClassRef?: QB.Reference;
  PrintStatus?: string;
  SalesTermRef?: QB.Reference;
  TxnSource?: string;
  LinkedTxn?: InvoiceLinkedTxn[];
  DepositeToAccountRef?: QB.Reference;
  GlobalTaxCalculation?: QB.GlobalTaxCalculationEnum;
  AllowOnlineACHPayment?: boolean;
  TransactionLocationType?: string;
  // TransactionLocationType: "WithinFrance" | "FranceOverseas" | "OutsideFranceWithEU" | "OutsideEU";
  DueDate?: QB.DateType;
  PrivateNote?: string;
  BillEmailCc?: {
    Address?: string;
  }
  CustomerMemo?: QB.Reference;
  EmailStatus?: string;
  ExchangeRate?: number;
  Deposit?: number;
  TxnTaxDetail?: QB.TxnTaxDetail;
  AllowOnlineCreditCardPayment?: boolean;
  CustomField?: QB.CustomField[];
  ShipAddr?: QB.Addr;
  DepartmentRef?: QB.Reference;
  BillEmailBcc?: {
    Address?: string;
  }
  ShipMethodRef?: QB.Reference;
  BillAddr?: QB.Addr;
  ApplyTaxAfterDiscount?: boolean;
  HomeBalance?: number;
  DeliveryInfo?: {
    DeliveryType?: "Email" | "Tradeshift";
    DeliveryTime?: {
      dateTime?: string;
    }
  }
  TotalAmt?: string;
  InvoiceLink?: string;
  RecurDataRef: QB.Reference;
  TaxExemptionRef?: QB.Reference;
  Balance?: number;
  HomeTotalAmt?: number;
  FreeFormAddress?: boolean;
  AllowOnlinePayment?: boolean;
  AllowIPNPayment?: boolean;

  // ?
  // DiscountAmt?: number;
}

export class Invoice extends API<IInvoice> {
  constructor(parent: Quickbooks) {
    super(parent, {
      entityName: "invoice"
    });
  }
}

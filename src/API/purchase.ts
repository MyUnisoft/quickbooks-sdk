import API from "./API";

// Require Internal Dependencies
import * as QB from "../type";
import Quickbooks from "..";

type BillStatus = "Billable" | "NotBillable" | "HasBeenBilled";
type BillLineType = "ItemBasedExpenseLine" | "AccountBasedExpenseLine";

interface ItemBasedExpenseLineDetail {
  TaxInclusiveAmt?: number;
  ItemRef?: QB.Reference;
  CustomerRef?: QB.Reference;
  PriceLevelRef?: QB.Reference;
  ClassRef?: QB.Reference;
  TaxCodeRef?: QB.Reference;
  BillableStatus: BillStatus;
  Qty?: number;
  UnitPrice?: number;
}

interface AccountBasedExpenseLineDetail {
  AccountRef: QB.Reference;
  TaxInclusiveAmt?: number;
  BillableStatus: BillStatus;
  CustomerRef?: QB.Reference;
  TaxCodeRef?: QB.Reference;
  TaxAmount?: number;
}

// interface AccountBasedExpenseLineDetail {
//   AccountRef: QB.Reference;
//   TaxInclusiveAmt?: number;
//   BillableStatus: BillStatus;
//   TaxCodeRef?: QB.Reference;
//   TaxAmount?: number;
// }

type AccountBasedExpenseLine = QB.AbstractLine<"AccountBasedExpenseLineDetail">
  & { AccountBasedExpenseLineDetail: AccountBasedExpenseLineDetail; };
type ItemBasedExpenseLine = QB.AbstractLine<"ItemBasedExpenseLineDetail">
  & { ItemBasedExpenseLineDetail: ItemBasedExpenseLineDetail; };

type PurchaseLine = AccountBasedExpenseLine | ItemBasedExpenseLine;

interface PurchaseLinkedTxn {
  TxnId: string;
  TxnType: string;
  TxnLineId?: string;
}

interface IPurchase extends QB.RootEntityProperties {
  PurchaseEx: Record<string, unknown>
  TxnDate: string;
  PrintStatus?: string;
  RemitToAddr?: QB.Addr;
  TxnSource?: string;
  TotalAmt: number;
  PaymentType: "Cash" | "Check" | "CreditCard";
  PaymentMethodRef?: QB.Reference;
  AccountRef?: QB.Reference;
  CurrencyRef?: QB.Reference;
  EntityRef: {
    value: string;
    name: string;
    type: "Vendor" | "Customer" | "Employee";
  };
  TxnTaxDetail?: {
    TotalTax: number;
    TxnTaxCodeRef?: QB.Reference;
    TaxLine: QB.TaxLine[];
  };
  CustomField: any[];
  Line: PurchaseLine[];
  TransactionLocationType?: "WithinFrance" | "FranceOverseas" | "OutsideFranceWithEU" | "OutsideEU";
  LinkedTxn?: PurchaseLinkedTxn[];
  PrivateNote?: string;
  Credit?: boolean;
  SyncToken: string;
}

export default class Purchase extends API<IPurchase> {
  constructor(parent: Quickbooks) {
    super(parent, {
      entityName: "purchase"
    });
  }
}

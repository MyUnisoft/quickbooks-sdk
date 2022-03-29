// Import Internal Dependencies
import API from "./API";
import * as QB from "../type";
import Quickbooks from "../quickbooks";

interface ItemBasedExpenseLineDetail {
  TaxInclusiveAmt?: number;
  ItemRef?: QB.Reference;
  CustomerRef?: QB.Reference;
  PriceLevelRef?: QB.Reference;
  ClassRef?: QB.Reference;
  TaxCodeRef?: QB.Reference;
  MarkupInfo?: QB.MarkupInfo;
  BillableStatus?: QB.BillableStatusEnum;
  Qty?: number;
  UnitPrice?: number;
}

interface AccountBasedExpenseLineDetail {
  AccountRef: QB.Reference;
  TaxAmount?: number;
  TaxInclusiveAmt?: number;
  ClassRef?: QB.Reference;
  TaxCodeRef?: QB.Reference;
  MarkupInfo?: QB.MarkupInfo;
  BillableStatus?: QB.BillableStatusEnum;
  CustomerRef?: QB.Reference;
}

type AccountBasedExpenseLine = QB.AbstractLine<"AccountBasedExpenseLineDetail">
  & { AccountBasedExpenseLineDetail: AccountBasedExpenseLineDetail; };
type ItemBasedExpenseLine = QB.AbstractLine<"ItemBasedExpenseLineDetail">
  & {
    ItemBasedExpenseLineDetail: ItemBasedExpenseLineDetail;
    LinkedTxn?: QB.LinkedTxn[];
  };

type PurchaseLine = AccountBasedExpenseLine | ItemBasedExpenseLine;

export interface IPurchase extends QB.RootEntityProperties {
  Line: PurchaseLine[];
  PaymentType: "Cash" | "Check" | "CreditCard";
  AccountRef: QB.Reference;
  CurrencyRef?: QB.Reference;
  TxnDate?: string;
  PrintStatus: string;
  RemitToAddr?: QB.Addr;
  TxnSource?: string;
  LinkedTxn?: QB.LinkedTxn[];
  GlobalTaxCalculation?: QB.GlobalTaxCalculationEnum;
  TransactionLocationType?: "WithinFrance" | "FranceOverseas" | "OutsideFranceWithEU" | "OutsideEU";
  DocNumber?: string;
  PrivateNote?: string;
  Credit?: boolean;
  TxnTaxDetail?: QB.TxnTaxDetail;
  PaymentMethodRef?: QB.Reference;
  PurchaseEx: Record<string, unknown>
  EchangeRate?: number;
  DepartmentRef?: QB.Reference;
  EntityRef?: QB.Reference;
  IncludeInAnnualTPAR?: boolean;
  TotalAmt?: string;
  CustomField?: any[];
}

export class Purchase extends API<IPurchase> {
  constructor(parent: Quickbooks) {
    super(parent, {
      entityName: "purchase"
    });
  }
}

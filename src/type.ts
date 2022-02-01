
export interface Reference {
  value: string;
  name?: string;
}

export interface AbstractLine<T> {
  Id: string;
  DetailType: T;
  Amount: number;
  Description?: string;
  LineNum?: number;
}

export interface Addr {
  Id: number;
  Line1: string;
  Line2?: string;
  Line3?: string;
  Line4?: string;
  Line5?: string;
  City: string;
  Country: string;
  PostalCode: string;
  Lat: string;
  Long: string;
  CountrySubDivisionCode?: string;
}

export interface DateType {
  date?: string;
}

export interface TaxLine {
  Amount?: number;
  DetailType: "TaxLineDetail";
  TaxLineDetail: {
    TaxRateRef: Reference;
    PercentBased?: boolean;
    TaxPercent?: number;
    NetAmountTaxable?: number;
    TaxInclusiveAmount?: number;
    OverrideDeltaAmount?: number;
  };
}

export interface TxnTaxDetail {
  TxnTaxCodeRef?: Reference;
  TotalTax?: number;
  TaxLine?: TaxLine[];
}

export interface CustomField {
  DefinitionId?: string;
  StringValue?: string;
  Type?: "StringType";
  Name?: string;
}

export interface RootEntityProperties {
  Id?: string;
  domain: string;
  sparse: boolean;
  SyncToken?: string;
  MetaData: {
    CreateTime: string;
    LastUpdatedTime: string;
  };
  DocNumber?: string;
}

export interface MarkupInfo {
  PriceLevelRef?: Reference;
  Percent?: number;
  MarkUpIncomeAccountRef?: Reference;
}

export type BillableStatusEnum = "Billable" | "NotBillable" | "HadBeenBilled";
export type GlobalTaxCalculationEnum = "TaxExcluded" | "TaxInclusive" | "NotApplicable"

export interface LinkedTxn {
  TxnId: string;
  TxnType: string;
  TxnLineId?: string;
}

// ------------------------------------------------------------------

/**
 * Invoice
 */
// type InvoiceLineDetailType = "SubTotalLineDetail" | "DiscountLineDetail" |
//   "SalesItemLineDetail" | "GroupLineDetail" | "DescriptionOnlyLineDetail";

interface SalesItemLineDetail {
  TaxInclusiveAmt?: number;
  DiscountAmt?: number;
  ItemRef?: Reference;
  ClassRef?: Reference;
  TaxCodeRef?: Reference;
  MarkupInfo?: MarkupInfo;
  ItemAccountRef: Reference;
  ServiceDate: DateType;
  DiscountRate: number;
  Qty?: number;
  UnitPrice?: number;
  TaxClassificaitionRef: Reference;
}
type SalesItemLine = AbstractLine<"SalesItemLineDetail"> & {SalesItemLineDetail: SalesItemLineDetail}

interface GroupLineDetail {
  Quantity?: number;
  Line: SalesItemLineDetail[];
  GroupItemRef: Reference;
}
type GroupLine = Omit<AbstractLine<"GroupLineDetail">, "Amount"> & {GroupLineDetail: GroupLineDetail}


interface DescriptionOnlyLineDetail {
  TaxCodeRef?: Reference;
  Date?: DateType
}
type DescriptionOnlyLine = AbstractLine<"DescriptionOnlyLineDetail"> & {DescriptionOnlyLineDetail: DescriptionOnlyLineDetail}


interface DiscountLineDetail {
  ClassRef?: Reference;
  TaxCodeRef?: Reference;
  DiscountAccountRef?: Reference;
  PercentBased?: boolean;
  DismountPercent?: number;
}
type DiscountLine = AbstractLine<"DiscountLineDetail"> & {DiscountLineDetail: DiscountLineDetail}

interface SubTotalLineDetail {
  ItemRef: Reference;
}
type SubTotalLine = AbstractLine<"SubTotalLineDetail"> & {SubTotalLineDetail: SubTotalLineDetail}


export type InvoiceLine = SalesItemLine | GroupLine |
DescriptionOnlyLine | DiscountLine | SubTotalLine

// export interface InvoiceLine {
//   Id?: string;
//   DetailType: InvoiceLineDetailType;
//   Amount: number;
//   Description?: string;
//   LineNum?: string;
//   SalesItemLineDetail?: SalesItemLineDetail;
//   DiscountLineDetail?: {
//     PercentBased: boolean;
//     DiscountPercent?: number;
//   };
//   GroupLineDetail?: GroupLineDetail;
//   DescriptionOnlyLineDetail?: DescriptionOnlyLineDetail;
// }

/**
 * Invoice Customer
 */


/**
 * Accounts
 */
// interface Vendor extends RootEntityProperties {
//   Balance: number;
//   BillRate: number;
//   APAccountRef: Reference;
//   DisplayName: string;
//   PrintOnCheckName: string;
//   Active: boolean;
//   Vendor1099: boolean;
// }

// interface Account extends RootEntityProperties {
//   Name: string;
//   SubAccount: boolean;
//   FullyQualifiedName: string;
//   AccountAlias: string;
//   TxnLocationType?: string;
//   Active: boolean;
//   Classification: string;
//   AccountType: string;
//   AccountSubType: string;
//   AcctNum: string;
//   CurrentBalance: number;
//   CurrentBalanceWithSubAccounts: number;
//   CurrencyRef: Reference;
//   TaxCodeRef?: Reference;
// }

/**
 * TaxRate
 */
// interface EffectiveTaxRate {
//   RateValue: number;
//   EffectiveDate: string;
// }

// interface TaxRate extends RootEntityProperties {
//   Name: string;
//   Description: string;
//   Active: boolean;
//   RateValue: number;
//   AgencyRef: Reference;
//   TaxReturnLineRef: Reference;
//   EffectiveTaxRate: EffectiveTaxRate[];
//   SpecialTaxType: string;
// }

/**
 * Attachable
 */
// interface AttachableRef {
//   EntityRef: {
//     value: string;
//     type: "Invoice";
//   };
//   IncludeOnSend: boolean;
// }

// interface Attachable extends RootEntityProperties {
//   FileName: string;
//   FileAccessUri: string;
//   TempDownloadUri: string;
//   Size: number;
//   ContentType: string;
//   Category: string;
//   AttachableRef: AttachableRef[];
// }

/**
 * ITEM
 */
// interface Item extends RootEntityProperties {
//   Name: string;
//   Active: boolean;
//   FullyQualifiedName: string;
//   Taxable: boolean;
//   SalesTaxIncluded: boolean;
//   UnitPrice: number;
//   Type: "Service";
//   IncomeAccountRef: Reference;
//   PurchaseTaxIncluded: boolean;
//   PurchaseCost: number;
//   TrackQtyOnHand: boolean;
//   ItemCategoryType: "Service";
// }

/**
 * Purchase
 */
// type BillStatus = "Billable" | "NotBillable" | "HasBeenBilled";
// type BillLineType = "ItemBasedExpenseLine" | "AccountBasedExpenseLine";

// interface ItemBasedExpenseLineDetail {
//   TaxInclusiveAmt?: number;
//   ItemRef?: Reference;
//   CustomerRef?: Reference;
//   PriceLevelRef?: Reference;
//   ClassRef?: Reference;
//   TaxCodeRef?: Reference;
//   BillableStatus: BillStatus;
//   Qty?: number;
//   UnitPrice?: number;
// }


// interface ItemBasedExpenseLineDetail {
//   BillableStatus: BillStatus;
// }

// interface AccountBasedExpenseLineDetail {
//   AccountRef: Reference;
//   TaxInclusiveAmt?: number;
//   BillableStatus: BillStatus;
//   CustomerRef?: Reference;
//   TaxCodeRef?: Reference;
//   TaxAmount?: number;
// }

// interface AccountBasedExpenseLineDetail {
//   AccountRef: Reference;
//   TaxInclusiveAmt?: number;
//   BillableStatus: BillStatus;
//   TaxCodeRef?: Reference;
//   TaxAmount?: number;
// }

// type AccountBasedExpenseLine = AbstractLine<"AccountBasedExpenseLineDetail">
//   & { AccountBasedExpenseLineDetail: AccountBasedExpenseLineDetail; };
// type ItemBasedExpenseLine = AbstractLine<"ItemBasedExpenseLineDetail">
//   & { ItemBasedExpenseLineDetail: ItemBasedExpenseLineDetail; };

// type PurchaseLine = AccountBasedExpenseLine | ItemBasedExpenseLine;

// interface PurchaseLinkedTxn {
//   TxnId: string;
//   TxnType: string;
//   TxnLineId?: string;
// }

// interface Purchase extends RootEntityProperties {
//   PurchaseEx: Record<string, unknown>
//   TxnDate: string;
//   PrintStatus?: string;
//   RemitToAddr?: Addr;
//   TxnSource?: string;
//   TotalAmt: number;
//   PaymentType: "Cash" | "Check" | "CreditCard";
//   PaymentMethodRef?: Reference;
//   AccountRef?: Reference;
//   CurrencyRef?: Reference;
//   EntityRef: {
//     value: string;
//     name: string;
//     type: "Vendor" | "Customer" | "Employee";
//   };
//   TxnTaxDetail?: {
//     TotalTax: number;
//     TxnTaxCodeRef?: Reference;
//     TaxLine: TaxLine[];
//   };
//   CustomField: any[];
//   Line: PurchaseLine[];
//   TransactionLocationType?: "WithinFrance" | "FranceOverseas" | "OutsideFranceWithEU" | "OutsideEU";
//   LinkedTxn?: PurchaseLinkedTxn[];
//   PrivateNote?: string;
//   Credit?: boolean;
//   SyncToken: string;
// }

// export as namespace QB;

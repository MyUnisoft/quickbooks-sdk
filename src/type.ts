
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

export interface CustomField {
  DefinitionId: string;
  StringValue?: string;
  Type: "StringType";
  Name?: string;
}

export interface RootEntityProperties {
  domain: string;
  sparse: boolean;
  Id: string;
  SyncToken: string;
  MetaData: {
    CreateTime: string;
    LastUpdatedTime: string;
  };
  DocNumber?: string;
}

// ------------------------------------------------------------------

type InvoiceLineDetailType = "SubTotalLineDetail" | "DiscountLineDetail" |
    "SalesItemLineDetail" | "GroupLineDetail" | "DescriptionOnlyLineDetail";

export interface InvoiceLine {
  Amount: number;
  DetailType: InvoiceLineDetailType;
  SalesItemLineDetail?: {
    ItemRef?: Reference;
    Qty?: number;
    UnitPrice?: number;
    TaxCodeRef?: Reference;
    ItemAccountRef: Reference;
    DiscountAmt?: number;
  };
  DiscountLineDetail?: {
    PercentBased: boolean;
    DiscountPercent?: number;
  };
}

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

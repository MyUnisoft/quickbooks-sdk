
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
    NetAmountTaxable?: number;
    PercentBased?: boolean;
    TaxInclusiveAmount?: number;
    OverrideDeltaAmount?: number;
    TaxPercent?: number;
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
export type GlobalTaxCalculationEnum = "TaxExcluded" | "TaxInclusive" | "NotApplicable";

export interface LinkedTxn {
  TxnId: string;
  TxnType: string;
  TxnLineId?: string;
}

// ------------------------------------------------------------------

/**
 * Invoice
 */

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
type SalesItemLine = AbstractLine<"SalesItemLineDetail"> & { SalesItemLineDetail: SalesItemLineDetail };

interface GroupLineDetail {
  Quantity?: number;
  Line: SalesItemLineDetail[];
  GroupItemRef: Reference;
}
type GroupLine = Omit<AbstractLine<"GroupLineDetail">, "Amount"> & { GroupLineDetail: GroupLineDetail };


interface DescriptionOnlyLineDetail {
  TaxCodeRef?: Reference;
  Date?: DateType
}
type DescriptionOnlyLine = AbstractLine<"DescriptionOnlyLineDetail"> & { DescriptionOnlyLineDetail: DescriptionOnlyLineDetail };


interface DiscountLineDetail {
  ClassRef?: Reference;
  TaxCodeRef?: Reference;
  DiscountAccountRef?: Reference;
  PercentBased?: boolean;
  DismountPercent?: number;
}
type DiscountLine = AbstractLine<"DiscountLineDetail"> & { DiscountLineDetail: DiscountLineDetail };

interface SubTotalLineDetail {
  ItemRef: Reference;
}
type SubTotalLine = AbstractLine<"SubTotalLineDetail"> & { SubTotalLineDetail: SubTotalLineDetail };


export type InvoiceLine = SalesItemLine | GroupLine | DescriptionOnlyLine | DiscountLine | SubTotalLine;

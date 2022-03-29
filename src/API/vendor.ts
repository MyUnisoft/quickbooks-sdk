// Import Internal Dependencies
import API from "./API";
import * as QB from "../type";
import Quickbooks from "../quickbooks";

export interface IVendor extends QB.RootEntityProperties {
  Title?: string;
  GivenName?: string;
  MiddleName?: string;
  Suffix?: string;
  FamilyName?: string;
  PrimaryEmailAddr?: {
    Address?: string;
  }
  DisplayName?: string;
  OtherContactInfo?: {
    Type?: string;
    Telephone?: string;
  }
  APAccountRef?: QB.Reference;
  TermeRef?: QB.Reference;
  Source?: string;
  GSTIN?: string;
  T4AEligible?: boolean;
  Fax?: {
    FreeFormNumber?: string
  }
  BusinessNumber?: string;
  CurrencyRef?: QB.Reference;
  HasTPAR?: boolean;
  TaxReportingBasis?: string;
  Mobile?: {
    FreeFormNumber?: string;
  }
  PrimaryPhone?: {
    FreeFormNumber?: string;
  }
  Active?: boolean;
  AlternatePhone?: {
    FreeFormNumber?: string;
  }
  Vendor1099?: boolean;
  CostRate?: string;
  BillRate?: number;
  WebAddr?: {
    URI?: string;
  }
  T5018Eligible?: boolean;
  CompanyName?: string
  VendorPaymentBankDetail?: {
    BankAccountName?: string;
    BankBranchIdentifier: string;
    BankAccountNumber: string;
    StatementText: string;
  }
  TaxIdentifier?: string;
  AcctNum?: string;
  GSTRegistrationType?: "GST_REG_REG" | "GST_REG_COMP" | "GST_UNREG" | "CONSUMER" | "OVERSEAS" | "SEZ" | "DEEMED";
  PrintOnCheckName?: string;
  BillAddr?: QB.Addr;
  Balance: number;
}

export class Vendor extends API<IVendor> {
  constructor(parent: Quickbooks) {
    super(parent, {
      entityName: "vendor"
    });
  }
}

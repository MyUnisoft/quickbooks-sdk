import API from "./API";

// Require Internal Dependencies
import * as QB from "../type";
import Quickbooks from "..";

interface ICustomer extends QB.RootEntityProperties {
  DisplayName?: string;
  Title?: string;
  GivenName?: string;
  MiddleName?: string;
  Suffix?: string;
  FamilyName?: string;
  PrimaryEmailAddr?: {
    Address?: string;
  };
  ResaleNum?: string;
  SecondaryTaxIdentifier?: string;
  ARAccountRef?: QB.Reference
  DefaultTaxCodeRef: QB.Reference;
  PreferredDeliveryMethod?: string;
  GSTIN?: string;
  SalesTermRef?: QB.Reference;
  CustomerTypeRef?: QB.Reference;
  Fax?: {
    FreeFormNumber?: string;
  }
  BusinessNumber?: string;
  BillWithParent?: boolean;
  CurrencyRef?: QB.Reference;
  Mobile?: {
    FreeFormNumber?: string;
  }
  Job?: boolean;
  BalanceWithJobs?: number;
  PrimaryPhone?: {
    FreeFormNumber: string;
  };
  OpenBalanceDate?: QB.DateType;
  Taxable?: boolean;
  AlternatePhone?: {
    FreeFormNumber?: string;
  }
  ParentRef: QB.Reference;
  Notes?: string;
  WebAddr?: {
    URI?: string;
  }
  Active?: boolean;
  CompanyName?: string;
  Balance?: number;
  ShipAddr?: QB.Addr;
  PaymentMethodRef?: QB.Reference;
  IsProject?: boolean;
  Source?: string;
  PrimaryTaxIdentifier?: string;
  GSTRegistrationType?: "GST_REG_REG" | "GST_REG_COMP" | "GST_UNREG" | "CONSUMER" | "OVERSEAS" | "SEZ";
  PrintOnCheckName?: string;
  BillAddr?: QB.Addr;
  FullyQualifiedName?: string;
  Level?: number;
  TaxExemptionReasonId?: number;
}

export default class Customer extends API<ICustomer> {
  constructor(parent: Quickbooks) {
    super(parent, {
      entityName: "customer"
    });
  }
}

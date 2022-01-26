import API from "./API";

// Require Internal Dependencies
import * as QB from "../type";
import Quickbooks from "..";

interface ICustomer extends QB.RootEntityProperties {
  Taxable: boolean;
  BillAddr: QB.Addr;
  Job: boolean;
  BillWithParent: boolean;
  Balance: number;
  BalanceWithJobs: number;
  CurrencyRef: QB.Reference;
  PreferredDeliveryMethod: string;
  ARAccountRef: QB.Reference;
  IsProject: boolean;
  FullyQualifiedName: string;
  CompanyName: string;
  DisplayName: string;
  PrintOnCheckName: string;
  Active: boolean;
  PrimaryPhone: {
    FreeFormNumber: string;
  };
  PrimaryEmailAddr: {
    Address: string;
  };
}

export default class Customer extends API<ICustomer> {
  constructor(parent: Quickbooks) {
    super(parent, {
      entityName: "customer"
    });
  }
}

// Import Internal Dependencies
import API from "./API";
import * as QB from "../type";
import Quickbooks from "../quickbooks";

export interface IAccount extends QB.RootEntityProperties {
  Name: string;
  AcctNum?: string;
  CurrencyRef: QB.Reference;
  ParentRef: QB.Reference;
  Description?: string;
  Active?: boolean;
  SubAccount?: boolean;
  Classification?: string;
  FullyQualifiedName?: string;
  TxnLocationType?: "WithinFrance" | "FranceOverseas" | "OutsideFranceWithEU" | "OutsideEU";
  AccountType: string;
  CurrentBalanceWithSubAccounts?: number;
  AccountAlias: string;
  TaxCodeRef?: QB.Reference;
  AccountSubType: string;
  CurrentBalance: number;
}

export class Account extends API<IAccount> {
  constructor(parent: Quickbooks) {
    super(parent, {
      entityName: "account"
    });
  }
}

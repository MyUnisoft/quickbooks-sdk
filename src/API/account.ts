import API from "./API";

// Require Internal Dependencies
import * as QB from "../type";
import Quickbooks from "..";

interface IAccount extends QB.RootEntityProperties {
  Name: string;
  SubAccount: boolean;
  FullyQualifiedName: string;
  AccountAlias: string;
  TxnLocationType?: string;
  Active: boolean;
  Classification: string;
  AccountType: string;
  AccountSubType: string;
  AcctNum: string;
  CurrentBalance: number;
  CurrentBalanceWithSubAccounts: number;
  CurrencyRef: QB.Reference;
  TaxCodeRef?: QB.Reference;
}

export default class Account extends API<IAccount> {
  constructor(parent: Quickbooks) {
    super(parent, {
      entityName: "account"
    });
  }
}

import API from "./API";

// Require Internal Dependencies
import * as QB from "../type";
import Quickbooks from "..";

interface IVendor extends QB.RootEntityProperties {
  Balance: number;
  BillRate: number;
  APAccountRef: QB.Reference;
  DisplayName: string;
  PrintOnCheckName: string;
  Active: boolean;
  Vendor1099: boolean;
}

export default class Vendor extends API<IVendor> {
  constructor(parent: Quickbooks) {
    super(parent, {
      entityName: "vendor"
    });
  }
}

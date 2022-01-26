import API from "./API";

// Require Internal Dependencies
import * as QB from "../type";
import Quickbooks from "..";


interface IItem extends QB.RootEntityProperties {
  Name: string;
  Active: boolean;
  FullyQualifiedName: string;
  Taxable: boolean;
  SalesTaxIncluded: boolean;
  UnitPrice: number;
  Type: "Service";
  IncomeAccountRef: QB.Reference;
  PurchaseTaxIncluded: boolean;
  PurchaseCost: number;
  TrackQtyOnHand: boolean;
  ItemCategoryType: "Service";
}

export default class Item extends API<IItem> {
  constructor(parent: Quickbooks) {
    super(parent, {
      entityName: "item"
    });
  }
}

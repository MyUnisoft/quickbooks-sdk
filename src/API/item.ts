// Import Internal Dependencies
import API from "./API";
import * as QB from "../type";
import Quickbooks from "../quickbooks";

export interface IItem extends QB.RootEntityProperties {
  ItemCategoryType: "Service" | "Service";
  Name: string;
  InvStartDate?: QB.DateType;
  Type: "Service" | "Inventory" | "NonInventory";
  QtyOnHand?: number;
  AssetAccountRef?: QB.Reference;
  Sku?: string;
  SalesTaxIncluded?: boolean;
  TrackQtyOnHand?: boolean;
  SalesTaxCodeRef?: QB.Reference;
  ClassRef?: QB.Reference;
  Source?: string;
  PurchaseTaxIncluded?: boolean;
  Description?: string;
  AbatementRate?: number;
  SubItem?: boolean;
  Taxable?: boolean;
  UQCDisplayText?: string;
  ReorderPoint?: number;
  PurchaseDesc?: string;
  PrefVendorRef?: QB.Reference;
  Active?: boolean;
  UQCId?: string;
  ReverseChargeRate?: number;
  PurchaseTaxCodeRef?: QB.Reference;
  ServiceType?: string;
  PurchaseCost?: number;
  ParentRef: QB.Reference;
  UnitPrice?: number;
  FullyQualifiedName?: string;
  ExpenseAccountRef?: QB.Reference;
  Level?: number;
  IncomeAccountRef?: QB.Reference;
  TaxClassificationRef?: QB.Reference;
}

export class Item extends API<IItem> {
  constructor(parent: Quickbooks) {
    super(parent, {
      entityName: "item"
    });
  }
}

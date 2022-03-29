// Import Internal Dependencies
import API from "./API";
import * as QB from "../type";
import Quickbooks from "../quickbooks";

interface EffectiveTaxRate {
  RateValue: number;
  EffectiveDate: string;
}

export interface ITaxRate extends QB.RootEntityProperties {
  RateValue?: string;
  Name?: string;
  AgencyRef?: QB.Reference;
  SpecialTaxType?: string;
  EffectiveTaxRate?: EffectiveTaxRate[];
  DisplayType?: string;
  TaxReturnLineRef: QB.Reference;
  Active: boolean;
  OriginalTaxRate?: string;
  Description: string;
}

export class TaxRate extends API<ITaxRate> {
  constructor(parent: Quickbooks) {
    super(parent, {
      entityName: "taxrate"
    });
  }
}

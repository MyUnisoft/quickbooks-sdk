import API from "./API";

// Require Internal Dependencies
import * as QB from "../type";
import Quickbooks from "..";

interface EffectiveTaxRate {
  RateValue: number;
  EffectiveDate: string;
}

interface ITaxRate extends QB.RootEntityProperties {
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

export default class TaxRate extends API<ITaxRate> {
  constructor(parent: Quickbooks) {
    super(parent, {
      entityName: "taxrate"
    });
  }
}

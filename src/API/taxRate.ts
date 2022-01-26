import API from "./API";

// Require Internal Dependencies
import * as QB from "../type";
import Quickbooks from "..";

interface EffectiveTaxRate {
  RateValue: number;
  EffectiveDate: string;
}

interface ITaxRate extends QB.RootEntityProperties {
  Name: string;
  Description: string;
  Active: boolean;
  RateValue: number;
  AgencyRef: QB.Reference;
  TaxReturnLineRef: QB.Reference;
  EffectiveTaxRate: EffectiveTaxRate[];
  SpecialTaxType: string;
}

export default class TaxRate extends API<ITaxRate> {
  constructor(parent: Quickbooks) {
    super(parent, {
      entityName: "taxrate"
    });
  }
}

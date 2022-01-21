import API from "./API";

// Require Internal Dependencies
import Quickbooks from "..";

export interface IInvoice {
  test: string;
}

export default class Invoice extends API<IInvoice> {
  // private parent: Quickbooks;

  constructor(parent: Quickbooks, options = Object.create(null)) {
    super(parent, {
      entityName: "invoice"
    });

    // this.parent = parent;
  }
}

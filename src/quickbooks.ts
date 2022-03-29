// Import Node.js Dependencies
import crypto from "crypto";

// Import Third-party Dependencies
import { klona } from "klona/json";

// Import Internal Dependencies
import * as APIs from "./API/index";
import { Reports } from "./reports/reports";
import { isNullOrUndefined } from "./utils";

// CONSTANTS
export const kMaximumMinorVersion = 63;

function kV3QuickbooksEndpoints(sand) {
  return `https://${sand ? "sandbox-" : ""}quickbooks.api.intuit.com/v3/company/`;
}

export interface QuickbooksOptions {
  realmId: string;
  accessToken: string;
  sandbox: boolean;
  /**
   * @see https://developer.intuit.com/app/developer/qbo/docs/learn/explore-the-quickbooks-online-api/minor-versions
   * @default 63
   */
  minorVersion?: number;
}

type APITypes = typeof APIs;

export default class Quickbooks implements APITypes {
  private minorAPIVersion: number;

  private accessToken: string;
  private isSandBox = false;
  private baseQBURL: URL;
  private realmId: string;

  public Account: typeof APIs.Account;
  public Attachable: typeof APIs.Attachable;
  public CreditMemo: typeof APIs.CreditMemo;
  public Customer: typeof APIs.Customer;
  public Invoice: typeof APIs.Invoice;
  public Item: typeof APIs.Item;
  public Purchase: typeof APIs.Purchase;
  public TaxRate: typeof APIs.TaxRate;
  public Vendor: typeof APIs.Vendor;

  public Reports: Reports;

  constructor(options: QuickbooksOptions) {
    this.realmId = options.realmId;
    this.accessToken = options.accessToken;
    this.sandbox = options.sandbox;
    this.minorVersion = options.minorVersion ?? kMaximumMinorVersion;

    this.Reports = new Reports(this);

    for (const name of Object.keys(APIs)) {
      const item = APIs[name];
      this[item.constructor.name] = new item(this);
    }
  }

  getURLFor(baseRoute: string, params = {}) {
    const URI = new URL(baseRoute, this.baseURL);

    // URI.searchParams.set("minorversion", String(this.minorVersion));
    for (const [key, value] of Object.entries(params)) {
      URI.searchParams.set(key, String(value));
    }

    return URI;
  }

  get baseURL() {
    return this.baseQBURL;
  }

  get requestHeader() {
    return klona({
      Authorization: `Bearer ${this.accessToken}`,
      Accept: "application/json"
    });
  }

  set sandbox(value: boolean) {
    this.isSandBox = isNullOrUndefined(value) ? false : Boolean(value);
    const URI = new URL(`${kV3QuickbooksEndpoints(this.isSandBox)}${this.realmId}/`);

    this.baseQBURL = URI;
  }

  set minorVersion(value: number) {
    this.minorAPIVersion = Math.min(Math.max(Number(value), 1), kMaximumMinorVersion);
  }

  get minorVersion() {
    return this.minorAPIVersion;
  }

  static validateHookSignature(
    webhookPayload: string, intuitSignature: string, hookToken: string
  ): boolean {
    const hash = crypto
      .createHmac("sha256", hookToken)
      .update(webhookPayload)
      .digest("base64");

    return hash === intuitSignature;
  }
}

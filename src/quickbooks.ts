// Import Node.js Dependencies
import crypto from "crypto";

// Import Third-party Dependencies
import { pRateLimit } from "p-ratelimit";
import { InlineCallbackAction } from "@myunisoft/httpie";

// Import Internal Dependencies
import * as APIs from "./API/index";
import { Reports } from "./reports/reports";
import { isNullOrUndefined } from "./utils";

// CONSTANTS
export const kMaximumMinorVersion = 63;

function kV3QuickbooksEndpoints(sand: boolean): string {
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

export default class Quickbooks {
  private minorAPIVersion: number;
  private accessToken: string;
  private isSandBox = false;
  private baseQBURL: URL;
  private realmId: string;

  public ratelimit: InlineCallbackAction;
  public Account: APIs.Account;
  public Attachable: APIs.Attachable;
  public CreditMemo: APIs.CreditMemo;
  public Customer: APIs.Customer;
  public Invoice: APIs.Invoice;
  public Item: APIs.Item;
  public Purchase: APIs.Purchase;
  public TaxRate:  APIs.TaxRate;
  public Vendor: APIs.Vendor;

  public Reports: Reports;

  constructor(options: QuickbooksOptions) {
    this.realmId = options.realmId;
    this.accessToken = options.accessToken;
    this.sandbox = options.sandbox;
    this.minorVersion = options.minorVersion ?? kMaximumMinorVersion;

    this.Reports = new Reports(this);

    for (const name of Object.keys(APIs)) {
      const item = APIs[name];
      if (item.toString().startsWith("class ")) {
        const classObject = new item(this);
        this[classObject.constructor.name] = classObject;
      }
    }
  }

  getURLFor(baseRoute: string, params = {}) {
    const URI = new URL(baseRoute, this.baseURL);
    for (const [key, value] of Object.entries(params)) {
      URI.searchParams.set(key, String(value));
    }

    return URI;
  }

  get baseURL() {
    return this.baseQBURL;
  }

  get requestHeader() {
    return{
      Authorization: `Bearer ${this.accessToken}`,
      Accept: "application/json"
    };
  }

  set sandbox(value: boolean) {
    this.isSandBox = isNullOrUndefined(value) ? false : Boolean(value);
    const URI = new URL(`${kV3QuickbooksEndpoints(this.isSandBox)}${this.realmId}/`);
    /**
     * @see https://developer.intuit.com/app/developer/qbo/docs/learn/rest-api-features#limits-and-throttles
     */
    this.ratelimit = pRateLimit({
      interval: 60 * 1_000,
      rate: 500,
      concurrency: this.isSandBox ? 100 : 10
    });

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

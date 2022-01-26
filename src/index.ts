// Require Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { klona } from "klona/json";

// Require Internal Dependencies
import Account from "./API/account";
import Attachable from "./API/attachable";
import CreditMemo from "./API/creditMemo";
import Customer from "./API/customer";
import Invoice from "./API/invoice";
import Item from "./API/item";
import Purchase from "./API/purchase";
import TaxRate from "./API/taxRate";
import Vendor from "./API/vendor";

import {
  isNullOrUndefined,
  discoverIntuitConfiguration,
  DiscoveryConfig
} from "./utils";

// CONSTANTS
const kMaximumMinorVersion = 53;
// const kQueryOperators = new Set(["=", "IN", "<", ">", "<=", ">=", "LIKE"]);
const kIntuitTokenURL = "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer";
// const kIntuitRevokeURL = "https://developer.api.intuit.com/v2/oauth2/tokens/revoke";


function kV3QuickbooksEndpoints(sand) {
  return `https://${sand ? "sandbox-" : ""}quickbooks.api.intuit.com/v3/company/`;
}

function kIntuitDiscoveryURL(sand) {
  return `https://developer.intuit.com/.well-known/openid_${sand ? "sandbox_" : ""}configuration/`;
}

interface QuickbooksOptions {
  consumerKey: string;
  consumerSecret: string;
  realmId: string;
  accessToken: string;
  refreshToken: string;
  sandbox: boolean;
}

export default class Quickbooks {
  static Sandbox: DiscoveryConfig;
  static Production: DiscoveryConfig;

  public minorAPIVersion = 53;

  private accessToken: string;
  private refreshToken: string;
  private consumerKey: string;
  private consumerSecret: string;
  private isSandBox = false;
  private baseQBURL: URL;
  private realmId: string;

  public Account: Account;
  public Attachable: Attachable;
  public CreditMemo: CreditMemo;
  public Customer: Customer;
  public Invoice: Invoice;
  public Item: Item;
  public Purchase: Purchase;
  public TaxRate: TaxRate;
  public Vendor: Vendor;

  static async discoverIntuitEndpoints() {
    const [Sandbox, Production] = await Promise.all([
      discoverIntuitConfiguration(kIntuitDiscoveryURL(true)),
      discoverIntuitConfiguration(kIntuitDiscoveryURL(false))
    ]);
    Quickbooks.Sandbox = Sandbox;
    Quickbooks.Production = Production;
  }

  constructor(options: QuickbooksOptions = Object.create(null)) {
    this.consumerKey = options.consumerKey;
    this.consumerSecret = options.consumerSecret;
    this.realmId = options.realmId;
    this.accessToken = options.accessToken;
    this.refreshToken = options.refreshToken;
    this.sandbox = options.sandbox;

    this.Account = new Account(this);
    this.Attachable = new Attachable(this);
    this.CreditMemo = new CreditMemo(this);
    this.Customer = new Customer(this);
    this.Invoice = new Invoice(this);
    this.Item = new Item(this);
    this.Purchase = new Purchase(this);
    this.TaxRate = new TaxRate(this);
    this.Vendor = new Vendor(this);
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

  async refreshAccessToken() {
    const auth = Buffer.from(this.consumerKey + ":" + this.consumerSecret).toString("base64");
    const body = new URLSearchParams({
      grand_type: "refresh_token",
      refresh_token: this.refreshToken
    }).toString();

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + auth
    };

    const { data } = await httpie.post<any>(kIntuitTokenURL, { body, headers });
    console.log(data);

    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
  }

  async revokeAccess() {
    // TODO
  }
}

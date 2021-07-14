"use strict";

// Require Third-party Dependencies
const httpie = require("httpie");
const { klona } = require("klona/json");

// Require Internal Dependencies
const { isNullOrUndefined, discoverIntuitConfiguration } = require("./src/utils");

// CONSTANTS
const kV3QuickbooksEndpoints = (sand) => `https://${sand ? "sandbox-" : ""}quickbooks.api.intuit.com/v3/company/`;
const kIntuitDiscoveryURL = (sand) => `https://developer.intuit.com/.well-known/openid_${sand ? "sandbox_" : ""}configuration/`;

const kMaximumMinorVersion = 53;
const kQueryOperators = new Set(["=", "IN", "<", ">", "<=", ">=", "LIKE"]);
const kIntuitTokenURL = "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer";
const kIntuitRevokeURL = "https://developer.api.intuit.com/v2/oauth2/tokens/revoke";

class Quickbooks {
    static Sandbox = null;
    static Production = null;

    #accessToken;
    #refreshToken;
    #consumerKey;
    #consumerSecret;
    #isSandBox = false;
    #minorVersion = 53;
    #baseURL;
    #realmId;

    static async discoverIntuitEndpoints() {
        const [Sandbox, Production] = await Promise.all([
            discoverIntuitConfiguration(kIntuitDiscoveryURL(true)),
            discoverIntuitConfiguration(kIntuitDiscoveryURL(false))
        ]);
        Quickbooks.Sandbox = Sandbox;
        Quickbooks.Production = Production;
    }

    constructor(options = Object.create(null)) {
        this.#consumerKey = options.consumerKey;
        this.#consumerSecret = options.consumerSecret;
        this.#realmId = options.realmId;
        this.#accessToken = options.accessToken;
        this.#refreshToken = options.refreshToken;
        this.sandbox = options.sandbox;
    }

    get requestHeader() {
        return klona({
            Authorization: `Bearer ${this.#accessToken}`,
            Accept: "application/json"
        });
    }

    get baseURL() {
        return this.#baseURL.href;
    }

    set sandbox(value) {
        this.#isSandBox = isNullOrUndefined(value) ? false : Boolean(value);
        const URI = new URL(`${kV3QuickbooksEndpoints(this.#isSandBox)}${this.#realmId}/`);

        this.#baseURL = URI;
    }

    set minorVersion(value) {
        this.#minorVersion = Math.min(Math.max(Number(value), 1), kMaximumMinorVersion);
    }

    getURLFor(baseRoute, params = {}) {
        const URI = new URL(baseRoute, this.baseURL);
        URI.searchParams.set("minorversion", String(this.#minorVersion));
        for (const [key, value] of Object.entries(params)) {
            URI.searchParams.set(key, String(value));
        }

        return URI;
    }

    async refreshAccessToken() {
        const auth = Buffer.from(this.#consumerKey + ":" + this.#consumerSecret).toString("base64");
        const body = {
            grand_type: "refresh_token",
            refresh_token: this.#refreshToken
        };
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Basic " + auth
        };

        const { data } = await httpie.post(kIntuitTokenURL, { body, headers });
        console.log(data);

        this.#accessToken = data.access_token;
        this.#refreshToken = data.refresh_token;
    }

    async revokeAccess() {
        // TODO
    }

    async findInvoice(invoiceId) {
        const { data } = await httpie.get(this.getURLFor(`invoice/${invoiceId}`), { headers: this.requestHeader });

        return data;
    }
}

module.exports = Quickbooks;

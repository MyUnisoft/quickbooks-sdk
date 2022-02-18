// Require Node.js Dependencies
import crypto from "crypto";

// Require Internal Dependencies
import Quickbooks, { kMaximumMinorVersion } from "../../src";

describe("Quickbooks", () => {
  test("Quickbooks basics", async() => {
    const qb = new Quickbooks({
      accessToken: "aze",
      realmId: "aze",
      sandbox: true
    });

    expect(qb.minorVersion).toEqual(kMaximumMinorVersion);
    expect(qb.requestHeader).toStrictEqual({
      Authorization: "Bearer aze",
      Accept: "application/json"
    });
    expect(qb.baseURL.href).toEqual("https://sandbox-quickbooks.api.intuit.com/v3/company/aze/");
  });

  test("Quickbooks Instanciation with minorVersion", async() => {
    const qb = new Quickbooks({
      accessToken: "aze",
      realmId: "aze",
      sandbox: true,
      minorVersion: 10
    });

    expect(qb.minorVersion).toEqual(10);
  });

  test("Quickbooks change minorVersion", async() => {
    const qb = new Quickbooks({
      accessToken: "aze",
      realmId: "aze",
      sandbox: true
    });

    expect(qb.minorVersion).toEqual(kMaximumMinorVersion);

    qb.minorVersion = 10;

    expect(qb.minorVersion).toEqual(10);
  });

  test("Quickbooks sandbox true", async() => {
    const qb = new Quickbooks({
      accessToken: "aze",
      realmId: "aze",
      sandbox: true
    });

    expect(qb.baseURL.href).toEqual("https://sandbox-quickbooks.api.intuit.com/v3/company/aze/");
  });

  test("Quickbooks sandbox false", async() => {
    const qb = new Quickbooks({
      accessToken: "aze",
      realmId: "aze",
      sandbox: false
    });

    expect(qb.baseURL.href).toEqual("https://quickbooks.api.intuit.com/v3/company/aze/");
  });

  test("Quickbooks sandbox setter no boolean", async() => {
    const qb = new Quickbooks({
      accessToken: "aze",
      realmId: "aze",
      sandbox: true
    });

    qb.sandbox = undefined as any;

    expect(qb.baseURL.href).toEqual("https://quickbooks.api.intuit.com/v3/company/aze/");
  });

  test("Quickbooks static validateHookSignature", async() => {
    const hookToken = "secret";
    const webhookPayload = "testString";

    const intuitSignature = crypto
      .createHmac("sha256", hookToken)
      .update(webhookPayload)
      .digest("base64");


    const hash = Quickbooks.validateHookSignature(webhookPayload, intuitSignature, hookToken);

    expect(hash).toEqual(true);
  });
});

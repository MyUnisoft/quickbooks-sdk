// Require Internal Dependencies
import Quickbooks from "../../src";

describe("Quickbooks", () => {
  test("Instanciation", async() => {
    new Quickbooks({
      accessToken: "aze",
      realmId: "aze",
      sandbox: true
    });

    const qb = new Quickbooks({
      accessToken: "aze",
      realmId: "aze",
      sandbox: false
    });

    qb.minorVersion = 10;

    expect(qb.minorVersion).toBe(10);
  });
});

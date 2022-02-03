// Require Third-party Dependencies
import { MockAgent, setGlobalDispatcher } from "@myunisoft/httpie";

// Require Internal Dependencies
import Quickbooks from "../../src";

// const agent = new MockAgent();
// agent.disableNetConnect();

// setGlobalDispatcher(agent);

describe("Quickbooks", () => {
  test("Static method", async() => {
    await Quickbooks.discoverIntuitEndpoints();
  });

  test("Instanciation", async() => {
    new Quickbooks();

    new Quickbooks({
      consumerKey: "aze",
      consumerSecret: "aze",
      accessToken: "aze",
      refreshToken: "aze",
      realmId: "aze",
      sandbox: true
    });

    const qb = new Quickbooks({
      consumerKey: "aze",
      consumerSecret: "aze",
      accessToken: "aze",
      refreshToken: "aze",
      realmId: "aze",
      sandbox: false
    });

    qb.minorVersion = 10;
  });
});

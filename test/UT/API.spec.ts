// Require Third-party Dependencies
import { MockAgent, setGlobalDispatcher } from "@myunisoft/httpie";

// Require Internal Dependencies
import API from "../../src/API/API" ;
import Quickbooks from "../../src/quickbooks";

const agent = new MockAgent();
agent.disableNetConnect();

setGlobalDispatcher(agent);

describe("API", () => {
  const qb = new Quickbooks({
    accessToken: "aze",
    realmId: "aze",
    sandbox: true
  });

  const baseUrl = qb.baseURL.origin;
  const client = agent.get(baseUrl);
  const entityName = "test";

  interface ITest {
    message: any;
    status: string;
  }

  class Test extends API<ITest> {
    constructor(parent: Quickbooks) {
      super(parent, { entityName });
    }
  }
  const api = new Test(qb);

  test("findOne", async() => {
    const testId = 62;
    client
      .intercept({
        path: `${qb.baseURL.pathname}${entityName}/${testId}?minorversion=53`,
        method: "GET"
      })
      .reply(200, {
        message: "findOne ok",
        status: "success"
      },
      { headers: { "content-type": "application/json" } });

    const resultAll = await api.findOne(testId);

    expect(resultAll.message).toBe("findOne ok");
  });

  test("find", async() => {
    client
      .intercept({
        path: `${qb.baseURL.pathname}query?minorversion=53&query=select+*+from+${entityName}`,
        method: "GET"
      })
      .reply(200, [{
        message: "find ok",
        status: "success"
      }],
      { headers: { "content-type": "application/json" } });

    const resultAll = await api.find();

    expect(resultAll[0].message).toBe("find ok");
  });

  test("create", async() => {
    client
      .intercept({
        path: `${qb.baseURL.pathname}${entityName}?minorversion=53`,
        method: "POST"
      })
      .reply(200, {});

    await api.create({
      message: "create ok",
      status: "success"
    });
  });
});

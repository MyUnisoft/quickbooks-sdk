// Require Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { ConditionalCriteria, CriteriaObj } from "../../dist/utils";

// Require Internal Dependencies
import API from "../../src/API/API" ;
import Quickbooks from "../../src/quickbooks";
import * as QB from "../../src/type";

const kMockHttpAgent = new httpie.MockAgent();
const kOriginalHttpDispatcher = httpie.getGlobalDispatcher();
const kHttpReplyHeaders = { headers: { "content-type": "application/json" } };
const kEntityName = "test";

function initiateHttpieMock() {
  const qb = new Quickbooks({
    accessToken: "aze",
    realmId: "aze",
    sandbox: true
  });

  const mockClient = kMockHttpAgent.get(qb.baseURL.origin);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${qb.baseURL.pathname}${kEntityName}`),
      method: "GET"
    })
    .reply(200, {
      message: "findOne ok",
      status: "success"
    }, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${qb.baseURL.pathname}query`),
      method: "GET"
    })
    .reply(200, [{
      message: "find ok",
      status: "success"
    }], kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${qb.baseURL.pathname}${kEntityName}`),
      method: "POST"
    })
    .reply(200, {}, kHttpReplyHeaders);

  interface ITest {
    message: any;
    status: string;
  }

  class Test extends API<ITest> {
    constructor(parent: Quickbooks) {
      super(parent, { entityName: kEntityName });
    }
  }

  return new Test(qb);
}

beforeAll(() => {
  kMockHttpAgent.disableNetConnect();
  httpie.setGlobalDispatcher(kMockHttpAgent);
});

afterAll(() => {
  kMockHttpAgent.enableNetConnect();
  httpie.setGlobalDispatcher(kOriginalHttpDispatcher);
});


describe("API", () => {
  test("findOne with number", async() => {
    const api = initiateHttpieMock();

    const testId = 62;
    const resultAll = await api.findOne(testId);

    expect(resultAll.message).toBe("findOne ok");
  });

  test("findOne with reference", async() => {
    const reference: QB.Reference = { value: "62" };

    const api = initiateHttpieMock();

    const resultAll = await api.findOne(reference);

    expect(resultAll.message).toBe("findOne ok");
  });

  test("find", async() => {
    const api = initiateHttpieMock();

    const resultAll = await api.find();

    expect(resultAll[0].message).toBe("find ok");
  });

  test("find with criteria as CriteriaObj", async() => {
    const objTest: CriteriaObj = { field: "test2", operator: ">", value: "10" };
    const api = initiateHttpieMock();

    const resultAll = await api.find(objTest);

    expect(resultAll[0].message).toBe("find ok");
  });

  test("find with criteria as ConditionalCriteria", async() => {
    const objTest: ConditionalCriteria = {
      and: [
        {
          or: [
            { field: "test", operator: "<", value: "1" },
            { field: "test2", operator: ">", value: "10" }
          ]
        },
        {
          or: [
            { field: "test3", operator: "ILIKE", value: "bar" },
            { field: "test4", operator: "=", value: "foo" }
          ]
        }
      ]
    };

    const api = initiateHttpieMock();

    const resultAll = await api.find(objTest);

    expect(resultAll[0].message).toBe("find ok");
  });

  test("query", async() => {
    const api = initiateHttpieMock();

    const resultAll = await api.query("test = 'foobar'");

    expect(resultAll[0].message).toBe("find ok");
  });

  test("create", async() => {
    const api = initiateHttpieMock();

    const result = await api.create({
      message: "create ok",
      status: "success"
    });

    expect(result).toStrictEqual({});
  });
});

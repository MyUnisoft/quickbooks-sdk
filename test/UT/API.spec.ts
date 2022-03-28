// Require Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Require Internal Dependencies
import { ConditionalCriteria, CriteriaObj } from "../../dist/utils";
import Quickbooks from "../../src/quickbooks";
import API from "../../src/API/API" ;
import * as QB from "../../src/type";

// CONSTANTS
const kMockHttpAgent = new httpie.MockAgent();
const kOriginalHttpDispatcher = httpie.getGlobalDispatcher();
const kHttpReplyHeaders = { headers: { "content-type": "application/json" } };
const kEntityName = "test";


function initiateHttpieMock(baseURL: string, pathNameURL :string) {
  const mockClient = kMockHttpAgent.get("https://sandbox-quickbooks.api.intuit.com");

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${pathNameURL}${kEntityName}`),
      method: "GET"
    })
    .reply(200, {
      message: "findOne ok",
      status: "success"
    }, kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${pathNameURL}query`),
      method: "GET"
    })
    .reply(200, [{
      message: "find ok",
      status: "success"
    }], kHttpReplyHeaders);

  mockClient
    .intercept({
      path: (url) => url.startsWith(`${pathNameURL}${kEntityName}`),
      method: "POST"
    })
    .reply(200, {}, kHttpReplyHeaders);

  return mockClient;
}

const qb = new Quickbooks({
  accessToken: "aze",
  realmId: "aze",
  sandbox: true
});

interface ITest {
  message: any;
  status: string;
}

class Test extends API<ITest> {
  constructor(parent: Quickbooks) {
    super(parent, { entityName: kEntityName });
  }
}
const api = new Test(qb);

beforeAll(() => {
  kMockHttpAgent.disableNetConnect();
  httpie.setGlobalDispatcher(kMockHttpAgent);
});

afterAll(() => {
  kMockHttpAgent.enableNetConnect();
  httpie.setGlobalDispatcher(kOriginalHttpDispatcher);
});


describe("API", () => {
  let mockClient;
  beforeEach(() => {
    mockClient = initiateHttpieMock(qb.baseURL.origin, qb.baseURL.pathname);
  });

  afterEach(async() => {
    await mockClient.close();
  });

  test("findOne with number", async() => {
    const testId = 62;
    const resultAll = await api.findOne(testId);

    expect(resultAll.message).toBe("findOne ok");
  });

  test("findOne with reference", async() => {
    const reference: QB.Reference = { value: "62" };

    const resultAll = await api.findOne(reference);

    expect(resultAll.message).toBe("findOne ok");
  });

  test("find", async() => {
    const resultAll = await api.find();

    expect(resultAll[0].message).toBe("find ok");
  });

  test("find with criteria as CriteriaObj", async() => {
    const objTest: CriteriaObj = { field: "test2", operator: ">", value: "10" };

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

    const resultAll = await api.find(objTest);

    expect(resultAll[0].message).toBe("find ok");
  });

  test("query", async() => {
    const resultAll = await api.query("test = 'foobar'");

    expect(resultAll[0].message).toBe("find ok");
  });

  test("create", async() => {
    const result = await api.create({
      message: "create ok",
      status: "success"
    });

    expect(result).toStrictEqual({});
  });
});

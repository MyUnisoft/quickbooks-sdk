// Require Third-party Dependencies
import { MockAgent, setGlobalDispatcher } from "@myunisoft/httpie";

// Require Internal Dependencies
import { Reports } from "../../src/reports/reports";
import Quickbooks from "../../src/quickbooks";

const agent = new MockAgent();
agent.disableNetConnect();

setGlobalDispatcher(agent);

describe("Reports", () => {
  const qb = new Quickbooks({
    accessToken: "aze",
    realmId: "aze",
    sandbox: true
  });

  const baseUrl = qb.baseURL.origin;
  const client = agent.get(baseUrl);

  interface IReportResult {
    message: any;
    status: string;
  }

  const Report = new Reports(qb);

  test("FEC", async() => {
    client
      .intercept({
        path: `${qb.baseURL.pathname}reports/FECReport?start_date=2022-01-01&end_date=2022-12-31`,
        method: "GET"
      })
      .reply(200, {
        message: "FEC ok",
        status: "success"
      },
      { headers: { "content-type": "application/json" } });

    const result = await Report.FEC({
      start_date: "2022-01-01",
      end_date: "2022-12-31"
    }) as unknown as IReportResult;

    expect(result.message).toBe("FEC ok");
  });
});

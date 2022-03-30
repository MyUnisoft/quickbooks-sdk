// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import Quickbooks from "../quickbooks";
import * as QB from "../type";
import { SQLConditionalCriteria, SQLCriteria, criteriaToSQL, capitalizeFirstLetter } from "../utils";

export interface APIConstructorOptions {
  entityName: string;
}

export interface APIQueryManyResponse {
  QueryResponse: {
    startPosition: number;
    maxResults: number,
    totalCount: number;
  },
  time: string;
}

export { SQLConditionalCriteria, SQLCriteria };

export default abstract class API<T> {
  private quickbooks: Quickbooks;
  private entityName: string;
  private upperCaseEntityName: string;

  constructor(quickbooks: Quickbooks, options: APIConstructorOptions) {
    this.quickbooks = quickbooks;
    this.entityName = options.entityName;
    this.upperCaseEntityName = capitalizeFirstLetter(this.entityName);
  }

  getURLFor(baseRoute: string, params: Record<string, string> = {}) {
    const URI = new URL(baseRoute, this.quickbooks.baseURL);

    URI.searchParams.set("minorversion", String(this.quickbooks.minorVersion));
    for (const [key, value] of Object.entries(params)) {
      URI.searchParams.set(key, String(value));
    }

    return URI;
  }

  async find(criteria?: SQLConditionalCriteria | SQLCriteria): Promise<T[]> {
    const url = this.getURLFor("query");

    const whereQuery = typeof criteria === "undefined" ? "" : ` WHERE ${criteriaToSQL(criteria)}`;
    url.searchParams.set("query", `select * from ${this.entityName}${whereQuery}`);

    const { data } = await httpie.get<APIQueryManyResponse>(
      url,
      {
        limit: this.quickbooks.ratelimit,
        headers: {
          ...this.quickbooks.requestHeader,
          "Content-Type": "application/text"
        }
      }
    );

    return data.QueryResponse[this.upperCaseEntityName];
  }

  async findOne(id: number | QB.Reference): Promise<T> {
    const realId = typeof id === "number" ? id : Number(id.value);

    const { data } = await httpie.get<T>(
      this.getURLFor(`${this.entityName}/${realId}`),
      {
        limit: this.quickbooks.ratelimit,
        headers: this.quickbooks.requestHeader
      }
    );

    return data[this.upperCaseEntityName];
  }

  async query(sql: string): Promise<T[]> {
    const url = this.getURLFor("query");
    url.searchParams.set("query", sql);

    const { data } = await httpie.get<APIQueryManyResponse>(
      url,
      {
        limit: this.quickbooks.ratelimit,
        headers: {
          ...this.quickbooks.requestHeader,
          "Content-Type": "application/text"
        }
      }
    );

    return data.QueryResponse[this.upperCaseEntityName];
  }

  async create(entity: T): Promise<T | unknown> {
    const { data } = await httpie.post(
      this.getURLFor(`${this.entityName}`),
      {
        limit: this.quickbooks.ratelimit,
        headers: this.quickbooks.requestHeader,
        body: entity
      }
    );

    return data;
  }
}

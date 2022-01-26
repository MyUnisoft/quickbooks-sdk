// Require Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Require Internal Dependencies
import Quickbooks from "..";

interface APIConstructorOptions {
  entityName: string;
}

export default abstract class API<T> {
  private quickbooks: Quickbooks;
  private entityName: string;
  private target: string;

  constructor(quickbooks: Quickbooks, options: APIConstructorOptions) {
    this.quickbooks = quickbooks;

    this.entityName = options.entityName;
  }

  getURLFor(baseRoute: string, params = {}) {
    const URI = new URL(baseRoute, this.quickbooks.baseURL);

    URI.searchParams.set("minorversion", String(this.quickbooks.minorAPIVersion));
    for (const [key, value] of Object.entries(params)) {
      URI.searchParams.set(key, String(value));
    }

    return URI;
  }

  async find(): Promise<T[]> {
    const url = this.getURLFor("query");
    url.searchParams.set("query", `select * from ${this.entityName}`);

    console.log(url.href);

    const { data } = await httpie.get<T[]>(
      url,
      {
        headers: {
          ...this.quickbooks.requestHeader,
          "Content-Type": "application/text"
        }
      }
    );

    return data;
  }

  async findOne(id: number): Promise<T> {
    console.log(this.getURLFor(`${this.entityName}/${id}`).href);
    const { data } = await httpie.get<T>(
      this.getURLFor(`${this.entityName}/${id}`),
      { headers: this.quickbooks.requestHeader }
    );

    return data;
  }

  async create(entity: T) {
    const { data } = await httpie.post(
      this.getURLFor(`${this.entityName}`),
      {
        headers: this.quickbooks.requestHeader,
        body: entity
      }
    );

    return data;
  }
}

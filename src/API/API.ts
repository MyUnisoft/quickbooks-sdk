// Require Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Require Internal Dependencies
import Quickbooks from "../quickbooks";
import * as QB from "../type";

export interface APIConstructorOptions {
  entityName: string;
}

type typeOperator = "<" | ">" | "=" | "<=" | ">=";

interface ConditionalCriteria {
  or?: CriteriaObj[] | ConditionalCriteria[];
  and?: CriteriaObj[] | ConditionalCriteria[];
}

interface CriteriaObj {
  field: string;
  value: string | number;
  operator: typeOperator;
}

export function criteriaToSQL(criteria: ConditionalCriteria | CriteriaObj): string {
  let finalQuery;
  for (const [key, value] of Object.entries(criteria)) {
    if (key === "and" || key === "or") {
      const items: string[] = [];
      for (const item of value) {
        items.push(criteriaToSQL(item));
      }
      finalQuery = ` (${items.join(` ${key.toUpperCase()} `)}) `;

      continue;
    }

    if (key === "field" || key === "value" || key === "operator") {
      const newObj: CriteriaObj = { ...criteria } as CriteriaObj;

      return `${newObj.field} ${newObj.operator} ${newObj.value}`;
    }
  }

  return `${finalQuery}`;
}

export default abstract class API<T> {
  private quickbooks: Quickbooks;
  private entityName: string;

  constructor(quickbooks: Quickbooks, options: APIConstructorOptions) {
    this.quickbooks = quickbooks;

    this.entityName = options.entityName;
  }

  getURLFor(baseRoute: string, params = {}) {
    const URI = new URL(baseRoute, this.quickbooks.baseURL);

    URI.searchParams.set("minorversion", String(this.quickbooks.minorVersion));
    for (const [key, value] of Object.entries(params)) {
      URI.searchParams.set(key, String(value));
    }

    return URI;
  }

  async find(): Promise<T[]> {
    const url = this.getURLFor("query");
    url.searchParams.set("query", `select * from ${this.entityName}`);

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

  async query(criteria: ConditionalCriteria | CriteriaObj) {
    const url = this.getURLFor("query");


    const whereQuery = criteriaToSQL(criteria);
    url.searchParams.set("query", `select * from ${this.entityName} WHERE ${whereQuery}`);

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

  async rawQuery(query: string): Promise<T[]> {
    const url = this.getURLFor("query");
    url.searchParams.set("query", query);

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

  async findOne(id: number | QB.Reference): Promise<T> {
    const realId = typeof id === "number" ? id : Number(id.value);
    const { data } = await httpie.get<T>(
      this.getURLFor(`${this.entityName}/${realId}`),
      { headers: this.quickbooks.requestHeader }
    );

    return data;
  }

  async create(entity: T): Promise<T | unknown> {
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

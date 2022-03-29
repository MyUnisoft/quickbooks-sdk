export type SQLOperator = "<" | ">" | "=" | "<=" | ">=" | "ILIKE" | "LIKE";

export interface SQLConditionalCriteria {
  or?: SQLCriteria[] | SQLConditionalCriteria[];
  and?: SQLCriteria[] | SQLConditionalCriteria[];
}

export interface SQLCriteria {
  field: string;
  value: string | number | boolean | null;
  operator: SQLOperator;
}

export function criteriaToSQL(criteria: SQLConditionalCriteria | SQLCriteria): string {
  if ("field" in criteria) {
    const value = typeof criteria.value === "string" ? `'${criteria.value}'` : criteria.value;

    return `${criteria.field} ${criteria.operator} ${value}`;
  }

  let conditionalKey;
  const items: string[] = [];
  for (const [key, value] of Object.entries(criteria)) {
    conditionalKey = key;
    items.push(...value.map((item) => criteriaToSQL(item)));
  }

  return `(${items.join(` ${conditionalKey.toUpperCase()} `)})`;
}

export function isNullOrUndefined(value: any): boolean {
  return typeof value === "undefined" || value === null;
}

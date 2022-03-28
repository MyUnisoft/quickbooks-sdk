type typeOperator = "<" | ">" | "=" | "<=" | ">=" | "ILIKE" | "LIKE";

export interface ConditionalCriteria {
  or?: CriteriaObj[] | ConditionalCriteria[];
  and?: CriteriaObj[] | ConditionalCriteria[];
}

export interface CriteriaObj {
  field: string;
  value: string | number;
  operator: typeOperator;
}

export function criteriaToSQL(criteria: ConditionalCriteria | CriteriaObj): string {
  if ("field" in criteria) {
    const value = typeof criteria.value === "number" ? criteria.value : `'${criteria.value}'`;

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

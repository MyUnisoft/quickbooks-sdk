type typeOperator = "<" | ">" | "=" | "<=" | ">=";

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
    return `${criteria.field} ${criteria.operator} ${criteria.value}`;
  }

  let conditionalKey;
  const items: string[] = [];
  for (const [key, value] of Object.entries(criteria)) {
    conditionalKey = key;
    items.push(...value.map((item) => criteriaToSQL(item)));
  }

  return ` (${items.join(` ${conditionalKey.toUpperCase()} `)}) `;
}

export function isNullOrUndefined(value: any): boolean {
  return typeof value === "undefined" || value === null;
}

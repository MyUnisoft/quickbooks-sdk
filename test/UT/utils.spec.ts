// Require Internal Dependencies
import { ConditionalCriteria, CriteriaObj, criteriaToSQL } from "../../dist/utils";


describe("criteriaToSQL", () => {
  test("Criteria as CriteriaObj with number", async() => {
    const objTest: CriteriaObj = { field: "test", operator: ">", value: 10 };

    const result = criteriaToSQL(objTest);

    expect(result).toBe("test > 10");
  });

  test("Criteria as CriteriaObj with string", async() => {
    const objTest: CriteriaObj = { field: "test", operator: ">", value: "10" };

    const result = criteriaToSQL(objTest);

    expect(result).toBe("test > '10'");
  });

  test("Criteria as ConditionalCriteria", async() => {
    const objTest: ConditionalCriteria = {
      and: [
        {
          or: [
            { field: "test", operator: "<", value: 1 },
            { field: "test2", operator: ">", value: 10 }
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

    const result = criteriaToSQL(objTest);

    expect(result).toBe("((test < 1 OR test2 > 10) AND (test3 ILIKE 'bar' OR test4 = 'foo'))");
  });
});

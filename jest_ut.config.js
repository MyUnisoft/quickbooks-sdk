module.exports =
{
  name: "UT",
  displayName: "Unit Testing",
  preset: "ts-jest",
  setupFilesAfterEnv: [
    "./test/jest.setup.js"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/src/**/*.ts"
  ],
  coverageDirectory: "./test/UT/coverage",
  testEnvironment: "node",
  testMatch: [
    "**/test/UT/**/*.spec.ts"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/test/fixtures/"
  ]
};

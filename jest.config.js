module.exports = {
  collectCoverageFrom: [
    "*.js"
  ],
  coveragePathIgnorePatterns: [
    "/jest.config.js",
    "/node_modules/"
  ],
  coverageReporters: [
    "cobertura",
    "text"
  ],
  coverageThreshold: {
    global: {
      "statements": 100,
      "branches": 100,
      "functions": 100,
      "lines": 100
    }
  },
  reporters: [
    "default",
    // "jest-junit"
    [
      "jest-junit",
      {
        output: "reports/junit.xml"
      }
    ]
  ]
}

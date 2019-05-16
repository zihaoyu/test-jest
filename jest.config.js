module.exports = {
  collectCoverageFrom: [
    "**/*.js"
  ],
  coveragePathIgnorePatterns: [
    "/jest.config.js",
    "/node_modules/"
  ],
  coverageReporters: [
    "cobertura",
    "text"
  ],
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

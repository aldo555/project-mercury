module.exports = {
  "setupFiles": ["jest-canvas-mock"],
  preset: '@vue/cli-plugin-unit-jest',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,vue}", "!**/node_modules/**"],
  // coverageReporters: ["html", "text-summary"]
}

module.exports = {
  bail: true,
  // collectCoverage: true,
  // collectCoverageFrom: ["src/**/*.jsx"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "app\.config": "__mocks__/app.configs.js"
  }
};

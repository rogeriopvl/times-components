const path = require('path');
const packageName = path.basename(path.normalize(path.join(__dirname, "../..")));

module.exports = {
  preset: "react-native",
  rootDir: "../../../..",
  transformIgnorePatterns: ["node_modules/(?!@times-components)/"],
  testMatch: [`<rootDir>/packages/${packageName}/__tests__/**/*.test.web.js`],
  moduleNameMapper: {
    "react-native": "react-native-web"
  },
  moduleFileExtensions: ["web.js", "js", "json"],
  testEnvironment: "jsdom"
};

const path = require('path');
const packageName = path.basename(path.normalize(path.join(__dirname, "../..")));

module.exports = {
  preset: "react-native",
  rootDir: "../../../..",
  transformIgnorePatterns: ["node_modules/(?!@times-components)/"],
  testMatch: [`<rootDir>/packages/${packageName}/__tests__/**/*.test.ios.js`],
  moduleFileExtensions: ["ios.js", "native.js", "js", "json"],
  setupTestFrameworkScriptFile: `<rootDir>/packages/${packageName}/jest-configs/ios/setupIosMocks.js`

};

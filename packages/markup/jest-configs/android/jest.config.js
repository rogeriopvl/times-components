const path = require('path');
const packageName = path.basename(path.normalize(path.join(__dirname, "../..")));

module.exports = {
  preset: "react-native",
  rootDir: "../../../..",
  transformIgnorePatterns: ["node_modules/(?!@times-components)/"],
  testMatch: [`<rootDir>/packages/${packageName}/__tests__/android/*.test.android.js`],
  moduleFileExtensions: ["android.js", "native.js", "js", "json"],
  setupTestFrameworkScriptFile: `<rootDir>/packages/${packageName}/jest-configs/android/setupAndroidMocks.js`
};

module.exports = variables => ({
  name: `@times-components/${variables.packageName}`,
  version: variables.version || "0.0.1",
  description: variables.packageDescription,
  main: `${variables.packageName}`,
  scripts: {
    flow: "node_modules/flow-bin/cli.js",
    "test:watch": "jest --bail --verbose --watchAll",
    test: "jest --bail --ci --coverage",
    "prettier:diff": "prettier --list-different '**/*.js'",
    lint: "eslint . && npm run prettier:diff"
  },
  jest: {
    preset: "react-native",
    rootDir: "../../",
    transformIgnorePatterns: ["node_modules/(?!@times-components)/"],
    testMatch: [`<rootDir>/packages/${variables.packageName}/**.test.js`]
  },
  repository: {
    type: "git",
    url: "git+https://github.com/newsuk/times-components.git"
  },
  keywords: [
    "react-native-web",
    "react",
    "native",
    "web",
    variables.packageName,
    "component"
  ],
  license: "BSD-3-Clause",
  bugs: {
    url: "https://github.com/newsuk/times-components/issues"
  },
  homepage: "https://github.com/newsuk/times-components#readme",
  devDependencies: {
    "babel-cli": "6.24.1",
    "babel-core": "6.24.1",
    "babel-loader": "7.0.0",
    "babel-plugin-transform-react-remove-prop-types": "0.4.5",
    "babel-preset-flow": "6.23.0",
    "babel-preset-react-native": "1.9.2",
    eslint: "3.19.0",
    "eslint-config-airbnb": "15.0.1",
    "eslint-config-prettier": "2.3.0",
    "eslint-plugin-import": "2.6.1",
    "eslint-plugin-jsx-a11y": "5.1.1",
    "eslint-plugin-react": "7.1.0",
    "flow-bin": "0.42.0",
    jest: "20.0.4",
    prettier: "1.7.0",
    react: "15.4.2",
    "react-dom": "15.4.2",
    "react-native": "0.42.3",
    "react-test-renderer": "15.4.2",
    webpack: "3.3.0"
  },
  dependencies: {
    "prop-types": "15.5.10",
    "react-native-web": "0.0.119"
  },
  peerDependencies: {
    react: ">=15",
    "react-dom": ">=15",
    "react-native": ">=0.42"
  },
  publishConfig: {
    access: "public"
  }
});

'use strict';

module.exports = variables => ({
  name: '@newsint/' + variables.packageName,
  version: variables.version || '0.0.1',
  description: variables.description,
  main: variables.packageName + '.js',
  scripts: {
    "flow": "node_modules/flow-bin/cli.js",
    "test:dev": "jest --bail --verbose --watch",
    "test": "jest --bail --ci --coverage"
  },
  "jest": {
    "preset": "react-native"
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/newsuk/times-components.git'
  },
  keywords: [ 'react-native-web', 'react', 'native', 'web', variables.packageName, 'component' ],
  license: 'BSD-3-Clause',
  bugs: {
    url: 'https://github.com/newsuk/times-components/issues'
  },
  homepage: 'https://github.com/newsuk/times-components#readme',
  devDependencies: {
    "babel-cli": "^6.24.1",
    "babel-core": "6.24.1",
    "babel-loader": "7.0.0",
    "babel-plugin-transform-react-remove-prop-types": "0.4.5",
    "babel-preset-flow": "^6.23.0",
    "babel-preset-react-native": "1.9.2",
    "flow-bin": "^0.42.0",
    "jest": "^20.0.4",
    "react-native": "^0.44.2",
    "react-test-renderer": "^15.5.4",
    "webpack": "2.6.1"
  },
  dependencies: {
    "react": "15.5.4",
    "react-dom": "15.5.4",
    "react-native-web": "0.0.96"
  },
  _timesComponentsCliVariables: variables
});

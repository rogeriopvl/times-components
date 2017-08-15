/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Tracking from "./tracking";

it("renders correctly", () => {
  const tree = renderer.create(<Tracking />).toJSON();

  expect(tree).toMatchSnapshot();
});

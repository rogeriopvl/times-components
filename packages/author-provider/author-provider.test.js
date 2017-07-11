/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ArticleListProvider from "./";

it("renders correctly", () => {
  const tree = renderer.create(<ArticleListProvider />).toJSON();

  expect(tree).toMatchSnapshot();
});

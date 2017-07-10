import { Text } from "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import ArticleListProvider from "./article-list-provider";

storiesOf("ArticleListProvider", module).add("ArticleListProvider", () =>
  <ArticleListProvider><Text>Yah</Text></ArticleListProvider>
);

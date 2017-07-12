import { View } from "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import Card from "./card";
import props from "./fixtures/card-props.json";

storiesOf("Card", module).add("Card", () =>
  <View style={{ width: "100%" }}>
    <Card {...props} />
  </View>
);

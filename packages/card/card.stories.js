import "intl";
import "intl/locale-data/jsonp/en";

import { Text, View } from "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import { IntlProvider } from "react-intl";
import Card from "./card";
import props from "./fixtures/card-props.json";

const story = m =>
  <IntlProvider textComponent={Text} locale="en">
    <View style={{ padding: 20 }}>{m}</View>
  </IntlProvider>;

storiesOf("Card", module).add("Card", () => story(<Card {...props} />));

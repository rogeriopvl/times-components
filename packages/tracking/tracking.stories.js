import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import { AuthorProfileWithTracking } from "@times-components/author-profile";
import { addTrackingContext } from "./tracking";

storiesOf("Tracking", module).add("Tracking mixture", () => {
  const WithTrackingContext = addTrackingContext(AuthorProfileWithTracking);

  return <WithTrackingContext />;
});

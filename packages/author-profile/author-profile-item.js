import React from "react";
import get from "lodash.get";
import { StyleSheet, View } from "react-native";
import Card, { CardWithTracking } from "@times-components/card";
import { addTracking } from "@times-components/tracking";

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10
  }
});

const passThrough = item => ({
  id: item.id,
  date: item.publishedTime,
  headline: item.title,
  imageTitle: item.leadAsset ? item.leadAsset.title : "",
  image: {
    uri: get(
      item,
      "leadAsset.crop.url",
      get(item, "leadAsset.posterImage.crop.url", null)
    )
  },
  text: item.teaser,
  label: item.label,
  publication: item.publicationName
});

export const AuthorProfileItemWithTracking = props => {
  const ViewWithTracking = addTracking(View, {
    trackingName: "AuthorProfileItemWithTracking"
  });

  return (
    <ViewWithTracking style={styles.container}>
      <CardWithTracking {...passThrough(props)} />
    </ViewWithTracking>
  );
};

export default props =>
  <View style={styles.container}>
    <Card {...passThrough(props)} />
  </View>;

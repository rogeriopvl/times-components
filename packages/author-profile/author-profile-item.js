import React from "react";
import { StyleSheet, View } from "react-native";
import Card, { CardWithTracking } from "@times-components/card";
import { addTracking } from "@times-components/tracking";

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10
  }
});

const AuthorProfileItem = item => {
  const props = {
    date: item.publishedTime,
    headline: item.title,
    imageTitle: item.leadAsset ? item.leadAsset.title : "",
    image: {
      uri: item.leadAsset ? item.leadAsset.crop.url : ""
    },
    text: item.teaser,
    label: item.label,
    publication: item.publicationName
  };

  return (
    <View style={styles.container}>
      <CardWithTracking {...props} />
    </View>
  );
};

export default addTracking(AuthorProfileItem);

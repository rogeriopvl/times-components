import React from "react";
import AuthorHead from "@times-components/author-head";
import Markup from "@times-components/markup";
import Card from "@times-components/card";
import { Dimensions } from "react-native";

const makeCard = (props, i) =>
  <Card
    {...props}
    key={i}
    width={Dimensions.get("window").width}
    image={{ uri: props.uri }}
  />;

export default ({ data }) => {
  if (data.error) {
    return <div>{data.error.message}</div>;
  }

  if (data.loading) {
    return <div>Loading . . .</div>;
  }

  const { name, jobTitle, image, biography, twitter, articles } = data.author;

  return (
    <div>
      <AuthorHead
        name={name}
        title={jobTitle}
        uri={image}
        bio={biography}
        twitter={twitter}
      />
      <Markup ast={biography} />
      {articles.map(makeCard)}
    </div>
  );
};

import React from "react";
import { FlatList, Text, Dimensions } from "react-native";
import Card from "@times-components/card";
import AuthorHead from "@times-components/author-head";

const Footer = () => <Text>FOOTER PAGE CONTROL</Text>;

export default function AuthorProfile({ data }) {
  if (data.error) {
    console.error(data.error);
    return <Text>{data.error.message}</Text>;
  }

  if (data.loading) {
    return <Text>Loading ...</Text>;
  }

  return (
    <FlatList
      data={data.author.articles}
      keyExtractor={article => article.id}
      ListHeaderComponent={() =>
        <AuthorHead
          name={data.author.name}
          title={data.author.jobTitle}
          uri={data.author.image}
          bio={data.author.biography}
          twitter={data.author.twitter}
        />}
      renderItem={({ item }) =>
        <Card
          {...item}
          width={Dimensions.get("window").width}
          image={{ uri: item.uri }}
        />}
      ListFooterComponent={() => <Footer />}
    />
  );
}

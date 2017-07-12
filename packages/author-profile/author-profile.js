import React from "react";
import { FlatList, View, Text, Dimensions } from "react-native";
import Card from "@times-components/card";
import Markup from "@times-components/markup";

const Header = ({ name, jobTitle, biography, twitter }) =>
  <View>
    <Text>{name}</Text>
    <Text>{jobTitle}</Text>
    <Markup ast={biography} wrapIn="p" />
    <Text>{twitter}</Text>
    <Text>HEADER PAGE CONTROL</Text>
  </View>;

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
      data={data.articles}
      keyExtractor={article => article.id}
      ListHeaderComponent={() =>
        <Header
          name={data.name}
          jobTitle={data.jobTitle}
          biography={data.biography}
          twitter={data.twitter}
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

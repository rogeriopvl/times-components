import React from "react";
import { FlatList, View, Text } from "react-native";
import Card from "@times-components/card";
import Markup from "@times-components/markup";

const Header = ({ name, jobTitle, biography, image, twitter }) =>
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
    return <Text>{data.error.message}</Text>;
  }

  if (data.loading) {
    return <Text>Loading ...</Text>;
  }

  const {
    name,
    jobTitle,
    image,
    twitter,
    biography,
    articles: { list }
  } = data.author;

  return (
    <FlatList
      data={list}
      keyExtractor={article => article.id}
      ListHeaderComponent={() =>
        <Header
          name={name}
          jobTitle={jobTitle}
          biography={biography}
          image={image}
          twitter={twitter}
        />}
      renderItem={({ item }) => {
        const {
          label,
          title,
          publishedTime,
          publicationName,
          teaser,
          leadAsset
        } = item;

        const uri = leadAsset.posterImage
          ? leadAsset.posterImage.crop.url
          : leadAsset.crop.url;

        const props = {
          label,
          headline: title,
          date: publishedTime,
          publication: publicationName,
          text: teaser,
          image: {
            uri: "https://placekitten.com/420/200"
          }
        };

        return <Card {...props} />;
      }}
      ListFooterComponent={() => <Footer />}
    />
  );
}

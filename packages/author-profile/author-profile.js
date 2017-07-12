import React from "react";
import { FlatList, View, Text } from "react-native";
import Card from "@times-components/card"

const Header = ({
  name,
  jobTitle,
  biography,
  image,
  twitter
}) =>
  <View>
    <Text>{name}</Text>
    <Text>{jobTitle}</Text>
    <Text>{biography}</Text>
    <Text>{twitter}</Text>
    <Text>HEADER PAGE CONTROL</Text>
  </View>

const Footer = () => <Text>FOOTER PAGE CONTROL</Text>

function renderArticleSummary({ item }) {
  const props = {
    date: item.publishedTime,
    label: item.label || "",
    publication: item.publicationName,
    source: {
      uri: item.url
    },
    text: item.teaser,
    title: item.title
  }

  return (
    <Card {...props} />
  )
}

export default function AuthorProfile({
  name,
  jobTitle,
  biography,
  image,
  twitter,
  articleCount,
  currentPageOfArticles,
  currentPageOffset,
  pageSize
}) {
  return (
    <FlatList
    data={currentPageOfArticles}
    keyExtractor={article => article.id}
    ListHeaderComponent={() =>
      <Header
        name={name}
        jobTitle={jobTitle}
        biography={biography}
        image={image}
        twitter={twitter}
        />
    }
    renderItem={renderArticleSummary}
    ListFooterComponent={() => <Footer/>}
  />
  );
}

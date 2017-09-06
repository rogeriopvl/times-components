import React from "react";
import { StyleSheet, View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  ApolloClient,
  ApolloProvider,
  createBatchingNetworkInterface,
  IntrospectionFragmentMatcher
} from "react-apollo";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import AuthorProfile from "./author-profile";
import example from "./example.json";

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#f5efeb",
    alignItems: "center"
  },
  container: {
    backgroundColor: "#fff",
    alignSelf: "stretch"
  }
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "UNION",
          name: "Media",
          possibleTypes: [
            {
              name: "Image"
            },
            {
              name: "Video"
            }
          ]
        }
      ]
    }
  }
});

const networkInterface = createBatchingNetworkInterface({
  uri: "http://localhost:4000/graphql/",
  batchInterval: 20
});

const client = new ApolloClient({
  networkInterface,
  fragmentMatcher
});

const story = m =>
  <View style={styles.background}>
    <View style={styles.container}>
      {m}
    </View>
  </View>;

storiesOf("Author Profile", module)
  .add("Default", () => {
    const props = {
      data: Object.assign({}, example, {
        count: example.articles.count,
        pageSize: 10,
        page: 1
      }),
      loading: false
    };

    props.data.articles.list.forEach(article => {
      // eslint-disable-next-line
      article.publishedTime = new Date(article.publishedTime);
    });

    return story(<AuthorProfile {...props} />);
  })
  .add("Loading", () => {
    const props = {
      loading: true
    };

    return story(<AuthorProfile {...props} />);
  })
  .add("Empty State", () => {
    const props = {
      loading: false
    };

    return story(<AuthorProfile {...props} />);
  })
  .add("Provider", () =>
    story(
      <ApolloProvider client={client}>
        <AuthorProfile
          imageRatio="3:2"
          slug="fiona-hamilton"
          page={1}
          pageSize={3}
        />
      </ApolloProvider>
    )
  );

import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider, IntrospectionFragmentMatcher } from "react-apollo";
import ArticleListProvider from "@times-components/author-provider";
import AuthorProfile from "./author-profile";

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

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "http://localhost:4000/graphql"
  }),
  fragmentMatcher
});

storiesOf("AuthorProfile", module).add("AuthorProfile", () =>
  <ApolloProvider client={client}>
    <ArticleListProvider
      slug="camilla-long"
      pageSize={10}
      pageNumber={1}
      imageRatio="3:2"
    >
      <AuthorProfile />
    </ArticleListProvider>
  </ApolloProvider>
);

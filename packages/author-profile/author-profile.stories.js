import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider, IntrospectionFragmentMatcher } from "react-apollo";
import articleListProvider from "@times-components/article-list-provider";
import AuthorProfile from "./author-profile";
import example from "./example.json";

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

const Author = articleListProvider({ slug: "fiona-hamilton" })(AuthorProfile);

storiesOf("AuthorProfile", module).add("AuthorProfile", () =>
  <ApolloProvider client={client}>
    <Author
      name={example.name}
      jobTitle={example.jobTitle}
      biography={JSON.parse(example.biography)}
      image={example.image}
      twitter={example.twitter}
      articleCount={example.articles.count}
      currentPageOfArticles={example.articles.list}
      currentPageOffset={0}
      pageSize={10}
    />
  </ApolloProvider>
);

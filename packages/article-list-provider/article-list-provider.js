import React from "react";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

const TrainerQuery = gql`
    query ArticleQuery {
        author(slug: "fiona-hamilton") {
            jobTitle
            biography
            image
            twitter
            articles {
                count
                list(first: 10) {
                    title
                    label
                    publicationName
                    publishedTime
                    leadAsset {
                        ... on Image {
                            title
                            crop(ratio: "3:2") {
                                url
                            }
                        }
                        ... on Video {
                            posterImage {
                                title
                                crop(ratio: "3:2") {
                                    url
                                }
                            }
                        }
                    }
                    teaser
                }
            }
        }
    }
`;

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "http://localhost:4000/graphql"
  })
});

export default function ArticleListProvider({ children }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}

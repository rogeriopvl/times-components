import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const articleQuery = gql`
    query ArticleQuery($slug: Slug!, $first: Int, $skip: Int, $imageRatio: Ratio!) {
        author(slug: $slug) {
            name
            jobTitle
            biography
            image
            twitter
            articles {
                count
                list(first: $first, skip: $skip) {
                    id
                    title
                    label
                    publicationName
                    publishedTime
                    leadAsset {
                        ... on Image {
                            title
                            crop(ratio: $imageRatio) {
                                url
                            }
                        }
                        ... on Video {
                            posterImage {
                                title
                                crop(ratio: $imageRatio) {
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

export default ({ children, slug, pageSize, pageNumber, imageRatio }) => {
  const Child = React.Children.only(children);

  const Component = graphql(articleQuery, {
    options: {
      variables: {
        slug,
        first: pageSize,
        skip: pageSize * (pageNumber - 1),
        imageRatio
      }
    }
  })(Child.type);

  return <Component />;
};

import { graphql } from "react-apollo";
import gql from "graphql-tag";

const articleQuery = gql`
    query ArticleQuery($slug: Slug!) {
        author(slug: $slug) {
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

export default ({ slug }) => graphql(articleQuery, {
  options: {
    variables: {
      slug
    }
  }
});

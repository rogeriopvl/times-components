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

const makeArticle = ({
  id,
  label,
  leadAsset,
  publicationName,
  publishedTime,
  teaser,
  title
}) => {
  const uri = leadAsset.posterImage
    ? leadAsset.posterImage.crop.url
    : leadAsset.crop.url;

  return {
    id,
    label,
    publication: publicationName,
    date: new Date(publishedTime),
    text: teaser,
    headline: title,
    uri: uri.replace(
      /\/\/www.thetimes.co.uk\/imageserver\/image/,
      "http://nu-cps-imgsrv-tnl-dev-webapp.elb.tnl-dev.ntch.co.uk/imageserver/image"
    )
  };
};

const Wrapper = ({ children, data }) => {
  const Child = React.Children.only(children);

  const author = {};

  if (data.author) {
    Object.assign(author, {
      articles: data.author.articles.list.map(makeArticle),
      biography: data.author.biography,
      image: data.author.image,
      jobTitle: data.author.jobTitle,
      name: data.author.name,
      twitter: data.author.twitter
    });
  }

  return React.createElement(Child.type, { data: { ...data, author } }, []);
};

export default ({ children, slug, pageSize, pageNumber, imageRatio }) => {
  const WrapperWithData = graphql(articleQuery, {
    options: {
      variables: {
        slug,
        first: pageSize,
        skip: pageSize * (pageNumber - 1),
        imageRatio
      }
    }
  })(Wrapper);

  return (
    <WrapperWithData>
      {children}
    </WrapperWithData>
  );
};

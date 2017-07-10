import React from "react";
import Markup from "@times-components/markup";
import Card from "@times-components/card";

const makeCard = ({
  label,
  title,
  publishedTime,
  publicationName,
  teaser,
  leadAsset
}, i) => {
  const uri = leadAsset.posterImage
    ? leadAsset.posterImage.crop.url
    : leadAsset.crop.url;
  const props = {
    key: `article-${i}`,
    label,
    headline: title,
    date: publishedTime,
    publication: publicationName,
    text: teaser,
    image: {
      uri
    }
  };

  return <Card {...props} />;
};

export default ({ data }) => {
  if (data.loading) {
    return <div>Loading . . .</div>;
  }

  const { biography, articles: { list } } = data.author;

  return (
    <div>
      <Markup ast={biography} />
      {list.map(makeCard)}
    </div>
  );
};

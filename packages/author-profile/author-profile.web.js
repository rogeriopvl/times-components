import React from "react";
import Markup from "@times-components/markup";
import Card from "@times-components/card";

const makeCard = (props, i) => <Card {...props} key={i} />;

export default ({ data }) => {
  if (data.error) {
    return <div>{data.error.message}</div>;
  }

  if (data.loading) {
    return <div>Loading . . .</div>;
  }

  const { biography, articles } = data.author;

  return (
    <div>
      <Markup ast={biography} />
      {articles.map(makeCard)}
    </div>
  );
};

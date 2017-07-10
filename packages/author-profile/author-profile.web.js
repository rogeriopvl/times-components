import React from "react";
import Markup from "@times-components/markup";

export default ({ data }) => {
  if (data.loading) {
    return <div>Loading . . .</div>;
  }

  console.log(data.author);
  debugger

  const { biography } = data.author;

  return <Markup ast={biography} />;
};

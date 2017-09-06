import React from "react";
import AuthorHead from "@times-components/author-head"
import Error from "../error";
import Loading from "./loading";
import Provider from "./provider";

const Component = ({ error, loading, author }) => {
  if (error) {
    return <Error error={error} />
  }

  if (loading) {
    return <Loading />
  }

  const props = {
    bio: author.biography,
    name: author.name,
    uri: author.image,
    title: author.jobTitle,
    twitter: author.twitter
  };

  return <AuthorHead {...props} />
}


export default (props) => (
  <Provider {...props}>
    {Component}
  </Provider>
);

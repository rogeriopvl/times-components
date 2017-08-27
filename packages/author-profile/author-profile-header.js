import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import AuthorHead, { AuthorHeadWithTracking } from "@times-components/author-head";
import Pagination, { PaginationWithTracking } from "@times-components/pagination";

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "center"
  },
  spacing: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    maxWidth: 800
  }
});

const extractProps = ({
  count,
  biography: bio,
  page,
  generatePageLink,
  image: uri,
  jobTitle: title,
  name,
  onNext,
  onPrev,
  pageSize,
  twitter
}) => {
  return {
    authorProps: {
      bio,
      name,
      uri,
      title,
      twitter
    },
    paginationProps: {
      count,
      generatePageLink,
      onNext,
      onPrev,
      page,
      pageSize
    }
  };
};

const propTypes = {
  biography: AuthorHead.propTypes.bio,
  count: Pagination.propTypes.count,
  image: AuthorHead.propTypes.uri,
  generatePageLink: Pagination.propTypes.generatePageLink,
  jobTitle: AuthorHead.propTypes.title,
  name: AuthorHead.propTypes.name,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  page: Pagination.propTypes.page,
  pageSize: Pagination.propTypes.pageSize,
  twitter: AuthorHead.propTypes.twitter
};

const defaultProps = {
  count: 0,
  biography: null,
  page: 0,
  generatePageLink: page => `?page=${page}`,
  image: null,
  jobTitle: null,
  name: null,
  onNext: () => {},
  onPrev: () => {},
  pageSize: 20,
  twitter: null
};

const makeAuthorProfileHeader = (Head, Pages) => props => {
  const { authorProps, paginationProps } = extractProps(props);
  const AuthorProfileHeader = (
    <View>
      <Head {...authorProps} />
      <View style={styles.container}>
        <View style={styles.spacing}>
          <Pages {...paginationProps} />
        </View>
      </View>
    </View>
  );

  AuthorProfileHeader.propTypes = propTypes;
  AuthorProfileHeader.defaultProps = defaultProps;

  return AuthorProfileHeader;
};

export const AuthorProfileHeaderWithTracking = makeAuthorProfileHeader(
  AuthorHeadWithTracking,
  PaginationWithTracking
);

export default makeAuthorProfileHeader(AuthorHead, Pagination);

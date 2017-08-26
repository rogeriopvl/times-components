import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import AuthorHead, {
  AuthorHeadWithTracking
} from "@times-components/author-head";
import Pagination, {
  PaginationWithTracking
} from "@times-components/pagination";

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
  count: PaginationWithTracking.propTypes.count,
  image: AuthorHead.propTypes.uri,
  generatePageLink: PaginationWithTracking.propTypes.generatePageLink,
  jobTitle: AuthorHead.propTypes.title,
  name: AuthorHead.propTypes.name,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  page: PaginationWithTracking.propTypes.page,
  pageSize: PaginationWithTracking.propTypes.pageSize,
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

export const AuthorProfileHeaderWithTracking = props => {
  const { authorProps, paginationProps } = extractProps(props);
  return (
    <View>
      <AuthorHeadWithTracking {...authorProps} />
      <View style={styles.container}>
        <View style={styles.spacing}>
          <PaginationWithTracking {...paginationProps} />
        </View>
      </View>
    </View>
  );
};

AuthorProfileHeaderWithTracking.propTypes = propTypes;
AuthorProfileHeaderWithTracking.defaultProps = defaultProps;

const AuthorProfileHeader = props => {
  const { authorProps, paginationProps } = extractProps(props);
  return (
    <View>
      <AuthorHead {...authorProps} />
      <View style={styles.container}>
        <View style={styles.spacing}>
          <Pagination {...paginationProps} />
        </View>
      </View>
    </View>
  );
};

AuthorProfileHeader.propTypes = propTypes;
AuthorProfileHeader.defaultProps = defaultProps;

export default AuthorProfileHeader;

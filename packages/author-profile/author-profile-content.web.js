import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { addTracking } from "@times-components/tracking";
import AuthorProfileHeader, {
  AuthorProfileHeaderWithTracking
} from "./author-profile-header";
import AuthorProfileItem, {
  AuthorProfileItemWithTracking
} from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";

const styles = StyleSheet.create({
  container: {
    maxWidth: 820,
    alignSelf: "center"
  }
});

const makeAuthorProfileContent = (Header, Item) => {
  class AuthorProfile extends Component {
    componentDidMount() {
      this.props.articles.list.forEach((props, indx) => {
        this.props.observeChild({ ...props, indx });
      });
    }
    render() {
      return (
        <View>
          <Header {...this.props} />
          {this.props.articles.list.map((item, key) => {
            const separatorComponent =
              key > 0 ? <AuthorProfileItemSeparator /> : null;

            return (
              <View key={item.id} style={styles.container}>
                {separatorComponent}
                <Item {...item} />
              </View>
            );
          })}
        </View>
      );
    }
  }

  AuthorProfile.propTypes = Object.assign(
    {
      articles: PropTypes.shape({
        list: PropTypes.arrayOf(
          PropTypes.shape(AuthorProfileItemWithTracking.propTypes)
        )
      })
    },
    AuthorProfileHeader.propTypes
  );

  return AuthorProfile;
};

export const AuthorProfileContentWithTracking = addTracking(
  makeAuthorProfileContent(
    AuthorProfileHeaderWithTracking,
    AuthorProfileItemWithTracking
  ),
  {
    trackChildViews: {
      id: "id",
      attrs: ["indx"]
    }
  }
);

export default makeAuthorProfileContent(AuthorProfileHeader, AuthorProfileItem);

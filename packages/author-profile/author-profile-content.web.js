import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import AuthorProfileHeader from "./author-profile-header";
import { AuthorProfileItemWithTracking } from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";

const styles = StyleSheet.create({
  container: {
    maxWidth: 820,
    alignSelf: "center"
  }
});

class AuthorProfile extends Component {
  componentDidMount() {
    this.props.articles.list.forEach((props, indx) => {
      this.props.observeChild({ ...props, indx });
    });
  }
  render() {
    return (
      <View>
        <AuthorProfileHeader {...this.props} />
        {this.props.articles.list.map((item, key) => {
          const separatorComponent =
            key > 0 ? <AuthorProfileItemSeparator /> : null;

          return (
            <View key={item.id} style={styles.container}>
              {separatorComponent}
              <AuthorProfileItemWithTracking {...item} />
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

export default AuthorProfile;

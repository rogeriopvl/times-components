import React, { Component } from "react";
import { ListView } from "react-native";
import PropTypes from "prop-types";
import { addTracking } from "@times-components/tracking";
import AuthorProfileHeader from "./author-profile-header";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";

class AuthorProfileContent extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.articles.list)
    };
  }

  render() {
    const onViewed = this.props.onViewed || (() => {});

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={rowData => <AuthorProfileItem {...rowData} />}
        renderSeparator={() => <AuthorProfileItemSeparator />}
        onChangeVisibleRows={({ s1 }) =>
          Object.keys(s1).forEach(indx => {
            if (s1[indx]) {
              onViewed({ ...this.props.articles.list[indx], indx });
            }
          })}
      />
    );
  }
}

AuthorProfileContent.propTypes = Object.assign(
  {
    articles: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape(AuthorProfileItem.propTypes))
    })
  },
  AuthorProfileHeader.propTypes
);

export const AuthorProfileContentWithTracking = addTracking(
  AuthorProfileContent,
  {
    trackChildViews: {
      id: "id",
      attrs: ["indx"],
      listPath: "articles.list"
    }
  }
);

export default AuthorProfileContent;

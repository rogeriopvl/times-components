import React from "react";
import { StyleSheet, View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import { addTrackingContext, logger } from "@times-components/tracking";
import { withPageState } from "@times-components/pagination";
import AuthorProfile, { AuthorProfileWithTracking } from "./author-profile";
import example from "./example.json";

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#f5efeb",
    alignItems: "center"
  },
  container: {
    backgroundColor: "#fff",
    alignSelf: "stretch"
  }
});

const story = m =>
  <View style={styles.background}>
    <View style={styles.container}>
      {m}
    </View>
  </View>;

storiesOf("AuthorProfile", module)
  .add("AuthorProfile", () => {
    const props = {
      data: Object.assign({}, example, {
        count: example.articles.count,
        pageSize: 10,
        page: 1
      }),
      isLoading: false
    };

    props.data.articles.list.forEach(article => {
      // eslint-disable-next-line
      article.publishedTime = new Date(article.publishedTime);
    });

    return story(<AuthorProfile {...props} />);
  })
  .add("AuthorProfile Loading", () => {
    const props = {
      isLoading: true
    };

    return story(<AuthorProfile {...props} />);
  })
  .add("AuthorProfile Empty State", () => {
    const props = {
      isLoading: false
    };

    return story(<AuthorProfile {...props} />);
  })
  .add("AuthorProfile with tracking", () => {
    const props = {
      data: Object.assign({}, example, {
        count: example.articles.count,
        pageSize: 10,
        page: 1
      }),
      isLoading: false
    };

    props.data.articles.list.forEach(article => {
      // eslint-disable-next-line
      article.publishedTime = new Date(article.publishedTime);
    });

    const AuthorProfileWithTrackingContext = addTrackingContext(
      withPageState(AuthorProfileWithTracking)
    );

    return story(
      <AuthorProfileWithTrackingContext
        {...props}
        perfStream={logger.perf}
        monitoringStream={logger.monitoring}
        analyticsStream={logger.analytics}
      />
    );
  });

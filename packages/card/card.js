import React from "react";
import { View, StyleSheet } from "react-native";
import ArticleSummary from "@times-components/article-summary";
import Image from "@times-components/image";
import { addTracking } from "@times-components/tracking";

const horizontalBreakpoint = 500;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  childrenContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto"
  },
  imageContainer: {
    paddingBottom: 15
  },
  horizontalContainer: {
    flexDirection: "row"
  },
  horizontalImageContainer: {
    flexGrow: 2,
    flexBasis: 0,
    paddingBottom: 0
  },
  horizontalSummaryContainer: {
    flexGrow: 3,
    flexBasis: 0,
    paddingLeft: 15
  }
});

const isOrientationHorizontal = width => width > horizontalBreakpoint;

class BaseCardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleLayout = this.handleLayout.bind(this);
    this.state = {
      isHorizontal: false
    };
  }
  handleLayout(event) {
    const width = event.nativeEvent.layout.width;
    const isHorizontal = isOrientationHorizontal(width);
    if (isHorizontal !== this.state.isHorizontal) {
      this.setState({ isHorizontal });
    }
  }
  render() {
    const { isHorizontal } = this.state;
    const { date, headline, label, publication, style, text } = this.props;

    return (
      <View
        onLayout={this.handleLayout}
        style={[
          styles.container,
          isHorizontal ? styles.horizontalContainer : null,
          style
        ]}
      >
        <View
          style={[
            styles.imageContainer,
            styles.childrenContainer,
            isHorizontal ? styles.horizontalImageContainer : null
          ]}
        >
          {this.props.children}
        </View>
        <View
          style={[
            styles.childrenContainer,
            isHorizontal ? styles.horizontalSummaryContainer : null
          ]}
        >
          <ArticleSummary
            label={label}
            headline={headline}
            text={text}
            date={date}
            publication={publication}
          />
        </View>
      </View>
    );
  }
}

BaseCardComponent.propTypes = Object.assign(
  {
    image: Image.propTypes.source
  },
  ArticleSummary.propTypes
);

BaseCardComponent.defaultProps = {
  image: {
    uri: ""
  }
};

const makeImageWithTracking = attrs =>
  addTracking(Image, ["onError", "onLoad"], "CardImage", attrs);

export const CardWithTracking = props => {
  const ImageWithTracking = makeImageWithTracking({
    title: props.imageTitle
  });
  return (
    <BaseCardComponent {...props}>
      <ImageWithTracking
        style={styles.image}
        source={props.image}
        accessibilityLabel={props.imageTitle}
      />
    </BaseCardComponent>
  );
};

export default props =>
  <BaseCardComponent {...props}>
    <Image style={styles.image} source={props.image} />
  </BaseCardComponent>;

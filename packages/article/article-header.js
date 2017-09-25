import React from "react";
import ArticleHeadline from "@times-components/article-headline";
import {
  NewArticleFlag,
  SponsoredArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag
} from "@times-components/article-flag";
import ArticleLabel from "@times-components/article-label";
import { Text, View } from "react-native";
import styles from "./article-style";
import {
  articleHeaderPropTypes,
  articleHeaderDefaultPropTypes
} from "./article-header.proptypes";

const flagsMapping = new Map([
  ["NEW", <NewArticleFlag />],
  ["UPDATED", <UpdatedArticleFlag />],
  ["EXCLUSIVE", <ExclusiveArticleFlag />],
  ["SPONSORED", <SponsoredArticleFlag />]
]);

const getFlags = flags => {
  if (!flags.length) return null;
  return (
    <View style={[styles.articleFlag]}>
      {flags.map(flag => (
        <View key={flag} style={styles.articleFlagContainer}>
          {flagsMapping.get(flag)}
        </View>
      ))}
    </View>
  );
};

const ArticleHeader = ({ label, title, standfirst, flags }) => (
  <View style={[styles.articleMainContentRow]}>
    {label ? (
      <View style={styles.articleLabel}>
        <ArticleLabel title={label} color="#13354E" />
      </View>
    ) : null}
    <View style={[styles.articleHeadline]}>
      <ArticleHeadline title={title} style={styles.articleHeadLineText} />
    </View>
    {standfirst ? <Text style={[styles.standFirst]}>{standfirst}</Text> : null}
    {getFlags(flags)}
  </View>
);

ArticleHeader.propTypes = articleHeaderPropTypes;

ArticleHeader.defaultProps = articleHeaderDefaultPropTypes;

export default ArticleHeader;

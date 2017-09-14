import React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 4
  },
  header: {
    height: 32,
    backgroundColor: "#b5b5b5",
    alignSelf: "stretch",
    opacity: 0.75,
    margin: 4,
    marginBottom: 8
  },
  content: {
    height: 20,
    backgroundColor: "#ececec",
    alignSelf: "stretch",
    opacity: 0.5,
    margin: 4
  }
})

const random = (offset = 10) => (Math.random() * 5).toFixed(2) * offset

const AuthorProfileItem = () => (
    <View style={styles.container}>
      <View style={[styles.header, {
        marginRight: 0 + random(50)
      }]}/>
      <View style={[styles.content, {
        marginRight: random()
      }]} />
      <View style={[styles.content, {
        marginRight: 20 + random()
      }]}/>
      <View style={[styles.content, {
        marginRight: 40 + random()
      }]}/>
      <View style={[styles.content, {
        marginRight: 50 + random()
      }]}/>
    </View>
  );

export default AuthorProfileItem;

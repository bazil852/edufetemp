import React from "react";
import { Image, StyleSheet } from "react-native";

const NotificationImage = ({ source, style }) => {
  return <Image source={source} style={[styles.image, style]} />;
};

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 320,
    marginHorizontal: "auto",
    marginTop: 20,
  },
});

export default NotificationImage;

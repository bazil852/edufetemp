import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

const Separator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 2,
    marginVertical: 20,
  },
});

export default Separator;

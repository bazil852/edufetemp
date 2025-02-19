import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors } from "../constants/Colors";
import { IdCardIcon } from "../svgs/IdCardIcon";
import Icon from "react-native-vector-icons/Ionicons";

const IdTypeItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <IdCardIcon />
      <View style={styles.textContainer}>
        <Text style={styles.itemLabel}>{item.label}</Text>
        {item.recommendation ? (
          <Text style={styles.itemRecommendation}>{item.recommendation}</Text>
        ) : null}
      </View>
      <Icon name="chevron-forward" size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  icon: {
    width: 28,
    height: 28,
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  itemLabel: {
    fontSize: 16,
    fontFamily: "Urbanist-Bold",
  },
  itemRecommendation: {
    color: "#31C440",
    marginTop: 5,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
});

export default IdTypeItem;

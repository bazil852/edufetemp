import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

const FundItem = ({ fund, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={styles.portfolioItem}
      onPress={onSelect} // Removed extra `fund.id` argument since it's passed directly
    >
      <Image
        source={fund.icon}
        style={{ width: 24, height: 24, marginHorizontal: 10 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.portfolioText}>{fund.name}</Text>
        <Text
          style={[styles.portfolioText, { color: Colors.gray, fontSize: 14 }]}
        >
          {fund.desc}
        </Text>
      </View>
      <View style={styles.circle}>
        {isSelected && <View style={styles.selectedCircle} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  portfolioItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#416E77",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#416E77",
  },
  portfolioText: {
    fontSize: 16,
    fontFamily: "Urbanist-SemiBold",
  },
});

export default FundItem;

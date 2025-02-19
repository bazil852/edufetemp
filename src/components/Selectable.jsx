import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Colors } from "../constants/Colors";

const Selectable = ({
  items,
  selectedItem,
  setSelectedItem,
  label,
  description,
  labelStyle,
  descriptionStyle,
}) => {
  return (
    <View>
      {label && <Text style={[styles.amountLabel, labelStyle]}>{label}</Text>}
      {description && (
        <Text style={[styles.walletBalance, descriptionStyle]}>
          {description}
        </Text>
      )}
      {/* Horizontal ScrollView for Selectable Items */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.timeRow}
      >
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timePeriodButton,
              selectedItem === item.value
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
            onPress={() => setSelectedItem(item.value)}
          >
            <Text
              style={[
                styles.timePeriodText,
                selectedItem === item.value
                  ? styles.activeText
                  : styles.inactiveText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  amountLabel: {
    fontFamily: "Urbanist-Bold",
    fontSize: 20,
    marginBottom: 4,
  },
  walletBalance: {
    fontFamily: "Urbanist-Regular",
    fontSize: 14,
    marginBottom: 20,
    color: Colors.gray,
  },
  timeRow: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  timePeriodButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    marginRight: 10,
  },
  activeButton: {
    backgroundColor: "#071F24",
  },
  inactiveButton: {
    backgroundColor: Colors.offWhite,
  },
  timePeriodText: {
    fontSize: 14,
  },
  activeText: {
    color: "#fff",
  },
  inactiveText: {
    color: "#000",
  },
});

export default Selectable;

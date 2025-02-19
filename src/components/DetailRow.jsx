import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const DetailRow = ({
  label,
  value,
  bold,
  labelStyles,
  valueStyles,
  iconSource,
}) => {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, labelStyles, bold && styles.bold]}>
        {label}
      </Text>
      <View style={styles.valueContainer}>
        <Text style={[styles.value, valueStyles, bold && styles.bold]}>
          {value}
        </Text>
        {iconSource && (
          <TouchableOpacity>
            <Image source={iconSource} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  label: {
    fontFamily: "Urbanist-Medium",
    fontSize: 16,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    fontFamily: "Urbanist-Medium",
    fontSize: 16,
  },
  bold: {
    fontFamily: "Urbanist-Bold",
    fontSize: 16, // Increased font size for bold text
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
});

export default DetailRow;

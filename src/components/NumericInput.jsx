import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import formatCurrency from "../utils/currency";
import { Colors } from "../constants/Colors";

export function NumericInput({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 10,
  placeholder = "Enter amount",
}) {
  const increment = () => {
    const newValue = Math.min(value + step, max);
    onChange(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(value - step, min);
    onChange(newValue);
  };

  const handleTextChange = (text) => {
    // Remove any non-numeric characters except decimal point
    const cleanedText = text.replace(/[^0-9.]/g, "");
    const numericValue = parseFloat(cleanedText);

    if (isNaN(numericValue)) {
      onChange(min);
      return;
    }

    // Clamp value between min and max
    const clampedValue = Math.min(Math.max(numericValue, min), max);
    onChange(clampedValue);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={formatCurrency(value)}
        onChangeText={handleTextChange}
        keyboardType="numeric"
        placeholder={placeholder}
        placeholderTextColor="#666"
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={decrement}
          style={styles.button}
          disabled={value <= min}
        >
          <AntDesign
            name="minussquare"
            size={24}
            color={value <= min ? "#ccc" : Colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={increment}
          style={styles.button}
          disabled={value >= max}
        >
          <AntDesign
            name="plussquare"
            size={24}
            color={value >= max ? "#ccc" : Colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
    ...Platform.select({
      web: {
        outlineStyle: "none",
      },
    }),
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
    gap: 8,
  },
  button: {
    padding: 4,
  },
});

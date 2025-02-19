import React from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/Colors";

import Icon from "react-native-vector-icons/Ionicons";

const BackNav = () => {
  const navigation = useNavigation();

  // Handle button press with optional back navigation
  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.buttonContainer}>
      <Icon name="arrow-back" size={24} color="#141414" />
    </TouchableOpacity>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  buttonContainer: {
    width: 40,
    height: 40,
    backgroundColor: Colors.offWhite,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default BackNav;

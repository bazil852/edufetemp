import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const Button = ({
  onPress,
  title,
  style,
  textStyle,
  loading = false,
  disabled = false,
  icon,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style, { opacity: disabled || loading ? 0.5 : 1 }]}
      disabled={disabled}
    >
      {loading && <ActivityIndicator size="small" color={"#fff"} />}
      <Text style={[styles.text, textStyle]}>{title}</Text>
      {icon &&
        (typeof icon === "function" || React.isValidElement(icon) ? (
          icon
        ) : (
          <Image source={icon} style={{ width: 20, height: 20 }} />
        ))}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 61,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
    borderWidth: 1, // Default border width
    borderColor: "transparent", // Default border color
    gap: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: "Urbanist-SemiBold",
  },
});

export default Button;

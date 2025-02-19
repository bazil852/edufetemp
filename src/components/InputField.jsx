import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Use FontAwesome or any other icon set
import { Colors } from "../constants/Colors";

const InputField = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoFocus = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const animatedLabelPosition = useState(new Animated.Value(value ? 1 : 0))[0];
  const inputRef = useRef(null);

  // Focus the input field when the component mounts
  React.useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedLabelPosition, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(animatedLabelPosition, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelStyle = {
    position: "absolute",
    left: 12,
    color: Colors.gray,
    top: animatedLabelPosition.interpolate({
      inputRange: [0, 3],
      outputRange: [20, 5], // Adjust the values as needed for your layout
    }),
    fontSize: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12], // Larger when acting as placeholder, smaller when floating
    }),
    zIndex: 1,
    paddingHorizontal: 4,
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={[styles.input, isFocused && styles.inputFocused]}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType} // Handle keyboard type
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={handleTogglePassword}
            style={styles.iconContainer}
          >
            <Icon
              name={showPassword ? "eye" : "eye-slash"}
              size={18}
              color={Colors.gray}
            />
          </TouchableOpacity>
        )}
      </View>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginVertical: 10,
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    height: 67,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 16,
    borderRadius: 10,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 50, // Ensure space for the icon
  },
  iconContainer: {
    position: "absolute",
    backgroundColor: Colors.offWhite,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    right: 16,
    top: "50%", // Adjust for vertical alignment
    transform: [{ translateY: -16 }], // Center the icon vertically
    zIndex: 2, // Ensure icon is above input field
  },
});

export default InputField;

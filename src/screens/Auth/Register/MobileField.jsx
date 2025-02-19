import React from "react";
import InputField from "../../../components/InputField";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Images from "../../../constants/Images";
import useRegister from "../../../hooks/useRegister";
import Container from "../../../components/Container";
import BackNav from "../../../components/BackNav";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../../../constants/Colors";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";

const MobileField = () => {
  const { formData, handleChange, loading, handleContinue } = useRegister(); // Use shared hook

  // Default value with Honduras country code
  const defaultMobileValue = formData.mobile.startsWith("+504")
    ? formData.mobile
    : "+504";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Container>
        <StatusBar barStyle="light-content" backgroundColor={"#fff"} />
        <BackNav />
        <View style={{ flex: 1 }}>
          <View style={styles.stepContainer}>
            <Text style={styles.signUpText}>Register your account</Text>

            <Text style={styles.stepText}>
              Your phone number ensures your account's security. Only one EDUFE
              account is allowed per phone number
            </Text>
          </View>
          <View style={styles.mobContainer}>
            <InputField
              label="Mobile Number"
              value={defaultMobileValue}
              onChangeText={(value) => handleChange("mobile", value)}
              keyboardType="phone-pad"
              autoFocus={true}
            />
            <Image style={styles.flag} source={Images.flag} />
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            title={"Continue"}
            style={styles.registerButton}
            onPress={handleContinue}
            textStyle={{ color: "white" }}
          />
        </View>
        <Loader isLoading={loading} />
      </Container>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mobContainer: {
    position: "relative",
    marginVertical: 10, // Adjust margin if needed
  },
  flag: {
    position: "absolute",
    top: "50%", // Center the flag vertically
    right: 16, // Adjust horizontal position if needed
    width: 24,
    height: 16,
    transform: [{ translateY: -8 }], // Center the flag vertically
  },
  stepContainer: {
    marginTop: 20,
  },
  signUpText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 24,
    marginBottom: 8,
  },
  stepText: {
    fontSize: 14,
    fontFamily: "Urbanist-Medium",
    color: Colors.gray,
    marginBottom: 12,
  },
  registerButton: {
    backgroundColor: Colors.primary,
  },
  footer: {
    marginBottom: 20,
  },
});

export default MobileField;

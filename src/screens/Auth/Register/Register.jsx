import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import BackNav from "../../../components/BackNav";
import { Colors } from "../../../constants/Colors";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import useRegister from "../../../hooks/useRegister";
import Container from "../../../components/Container";
import InputField from "../../../components/InputField";

const Register = () => {
  const { formData, passwordMessage, loading, handleChange, handleNext } =
    useRegister();

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={"#fff"} />
      <BackNav />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.stepContainer}>
          <Text style={styles.signUpText}>Register your account</Text>

          <Text style={styles.stepText}>
            Invest Effortlessly - Every Penny Counts
          </Text>
        </View>

        <View style={styles.mainContent}>
          <View style={{ flex: 1 }}>
            <InputField
              label="Full Name"
              value={formData.name}
              onChangeText={(value) => handleChange("name", value)}
              autoFocus={true}
            />
            <InputField
              label="Email Address"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <InputField
              label="Password"
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              secureTextEntry={true}
            />
            {formData.password.length > 0 ? (
              <Text
                style={[
                  styles.passwordMessage,
                  passwordMessage === "Your password is strong"
                    ? styles.strongPassword
                    : styles.weakPassword,
                ]}
              >
                {passwordMessage}
              </Text>
            ) : (
              <Text style={styles.minCharacters}>Minimum 8 characters</Text>
            )}
          </View>
          <Text style={styles.termsText}>
            By signing up, you agree to EDUFE’s Terms of Use and Privacy Policy.
            By providing your email, you consent to receive communications from
            EDUFE. You can opt-out anytime.
          </Text>
        </View>
      </ScrollView>

      {/* Button container aligned at the bottom */}
      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            style={styles.registerButton}
            onPress={handleNext}
            textStyle={{ color: "white" }}
          />
        </View>
      </View>

      <Loader isLoading={loading} />
    </Container>
  );
};

export default Register;

const styles = StyleSheet.create({
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
  scrollViewContent: {
    flexGrow: 1,
  },
  mainContent: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: "center",
    marginTop: 10,
  },
  registerButton: {
    backgroundColor: Colors.primary,
  },
  footer: {
    marginBottom: 20,
  },
  minCharacters: {
    fontFamily: "Urbanist-Medium",
    color: Colors.gray,
  },
  passwordMessage: {
    fontSize: 14,
    fontFamily: "Urbanist-Medium",
  },
  strongPassword: {
    color: "green",
  },
  weakPassword: {
    color: "red",
  },
  termsText: {
    fontFamily: "Urbanist-Medium",
    color: Colors.gray,
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 16,
  },
});

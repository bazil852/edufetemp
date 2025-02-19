import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Container from "./Container";
import BackNav from "./BackNav";
import Button from "./Button";
import Loader from "./Loader";
import { Colors } from "../constants/Colors";

const VerifyCode = ({
  buttonOneTitle,
  buttonOneAction,
  buttonTwoTitle,
  buttonTwoAction,
  additionalText,
  phone,
}) => {
  const navigation = useNavigation();
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false); // Loader state
  const inputRefs = useRef([]);

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Automatically focus on next input
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      } else if (value && index === inputRefs.current.length - 1) {
        // Dismiss the keyboard after the last input
        Keyboard.dismiss();
      }
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  const handleVerify = () => {
    // Simulate verification process
    if (isCodeComplete) {
      if (buttonTwoAction) {
        buttonTwoAction(code, setLoading); // Call the second button's action
      }
    }
  };

  const handleResend = () => {
    if (buttonOneAction) {
      buttonOneAction(setLoading); // Call the first button's action
    }
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.logInText}>Confirm that it’s you</Text>
          <Text style={styles.welcomeText}>
            Please enter the code that we sent to {phone}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChangeText={(value) => handleCodeChange(index, value)}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              autoFocus={index === 0}
            />
          ))}
        </View>
        {additionalText && (
          <Text style={styles.additionalText}>{additionalText}</Text>
        )}
      </View>

      {/* Buttons for Resend and Verify */}
      <View style={styles.btnContainer}>
        <Button
          style={{ flex: 1, backgroundColor: Colors.offWhite }}
          title={buttonOneTitle}
          onPress={handleResend} // Action for the first button
        />
        <Button
          style={{ flex: 1, backgroundColor: Colors.primary }}
          textStyle={{ color: "white" }}
          title={buttonTwoTitle}
          onPress={handleVerify}
        />
      </View>
      <Loader isLoading={loading} />
    </>
  );
};

export default VerifyCode;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  headerContainer: {
    marginTop: 20,
  },
  logInText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 24,
    marginBottom: 10,
  },
  welcomeText: {
    color: Colors.gray,
    fontFamily: "Urbanist-Medium",
    marginBottom: 24,
  },
  additionalText: {
    color: Colors.primary,
    fontFamily: "Urbanist-SemiBold",
    marginTop: 15,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 16,
  },
  input: {
    width: "25%",
    height: 67,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 5,
  },
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 16,
    marginBottom: 20,
  },
});

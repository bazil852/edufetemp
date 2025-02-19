import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Container from "../../components/Container";
import { StatusBar } from "expo-status-bar";
import BackNav from "../../components/BackNav";
import { Colors } from "../../constants/Colors";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

import RBSheet from "react-native-raw-bottom-sheet";
import Icons from "../../constants/Icons";

const FundsOtp = ({ route }) => {
  const navigation = useNavigation();
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false); // Loader state
  const inputRefs = useRef([]);
  const { selectedAmount } = route.params;

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
  const refDropdownSheet = useRef();
  const openSheet = () => {
    refDropdownSheet.current.open();
  };

  const closeSheet = () => {
    refDropdownSheet.current.close();
  };

  const handleVerify = () => {
    // Simulate verification process
    if (isCodeComplete) {
      setLoading(true); // Show the loader
      setTimeout(() => {
        setLoading(false);
        openSheet();
      }, 2000); // Simulate a network request delay
    }
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <StatusBar barStyle="light-content" backgroundColor={"#fff"} />
        <BackNav />
        <View style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <Text style={styles.logInText}>Enter the OTP code</Text>
            <Text style={styles.welcomeText}>
              Please enter the code that we sent to +44 0230 04844377
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
        </View>

        {/* Buttons for Resend and Verify */}
        <View style={styles.btnContainer}>
          <Button style={styles.resendButton} title={"Resend code"} />
          <Button
            style={styles.verifyButton}
            textStyle={styles.verifyButtonText}
            title={"Verify"}
            onPress={handleVerify}
          />
        </View>
      </ScrollView>

      <Loader
        isLoading={loading}
        message={
          "Please wait we’re gathering your information and investing your amount in EDUFE"
        }
      />
      <RBSheet ref={refDropdownSheet} customStyles={styles.sheetStyles}>
        <Image source={Icons.check} style={styles.sheetImage} />
        <ScrollView>
          <Text style={styles.sheetTitle}>
            Invested {""}L{selectedAmount}
            <Text style={{ fontSize: 14 }}>HNL</Text>
          </Text>

          <Text style={styles.sheetText}>
            You have successfully made the investment in Car Rentals of Jon
            Portfolio
          </Text>

          <Text style={styles.sheetText}>
            Please note that this investment will take at least 2 months to be
            invested in the market
          </Text>
        </ScrollView>
        <Button
          title={"Go to Home"}
          style={styles.homeButton}
          textStyle={styles.homeButtonText}
          onPress={() => navigation.navigate("TabNavigator")}
        />
      </RBSheet>
    </Container>
  );
};

export default FundsOtp;

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
  resendButton: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  verifyButton: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  verifyButtonText: {
    color: "white",
  },
  sheetStyles: {
    wrapper: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    draggableIcon: {
      backgroundColor: "#000",
    },
    container: {
      backgroundColor: "white",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      height: 350,
    },
  },
  sheetImage: {
    width: 56,
    height: 56,
  },
  sheetTitle: {
    fontSize: 24,
    fontFamily: "Urbanist-Bold",
    marginTop: 20,
  },
  sheetText: {
    fontFamily: "Urbanist-Medium",
    marginTop: 10,
  },
  homeButton: {
    backgroundColor: Colors.primary,
  },
  homeButtonText: {
    color: "#fff",
  },
});

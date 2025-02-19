import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../constants/Colors";
import BackNav from "../../../components/BackNav";
import { StatusBar } from "expo-status-bar";
import VerifyCode, { handleVerify } from "../../../components/VerifyCode";
import Container from "../../../components/Container";
import Api from "../../../api";
import { useAtom } from "jotai";
import { profileAtom } from "../../../atoms/global";

const Verify = ({ route }) => {
  const navigation = useNavigation();
  const [profile] = useAtom(profileAtom);
  const phoneNumber = route.params.phoneNumber;

  const verifyPhone = async (code, setLoading) => {
    Keyboard.dismiss();

    if (!code) {
      Alert.alert("Error", "Please enter OTP");
      return;
    }

    const res = await Api.verifyPhoneNumber(
      profile.id,
      {
        otp: code.join(""),
      },
      setLoading
    );

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    navigation.navigate("VerifyImg");
  };

  const resendOtp = async (setLoading) => {
    const res = await Api.sentOtp(
      profile.id,
      {
        phoneNumber: phoneNumber,
      },
      setLoading
    );
    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    Alert.alert("Success", "OTP sent successfully");
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <StatusBar barStyle="light-content" backgroundColor={"#fff"} />
        <BackNav />
        <VerifyCode
          buttonOneTitle="Resend Code"
          buttonTwoTitle="Verify"
          buttonOneAction={resendOtp}
          buttonTwoAction={verifyPhone}
          phone={phoneNumber}
        />
      </ScrollView>
    </Container>
  );
};

export default Verify;

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
    color: Colors.gray,
    fontFamily: "Urbanist-Medium",
    marginBottom: 24,
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

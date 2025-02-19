import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import BackNav from "../../components/BackNav";
import { Colors } from "../../constants/Colors";
import Button from "../../components/Button";
import Container from "../../components/Container";

const ForgotPass = () => {
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={"#fff"} />

      <BackNav />

      <View style={styles.headerContainer}>
        <Text style={styles.forgotText}>Forgot password</Text>
        <Text style={styles.linkText}>
          We’ll send you a link on +44 0230 04844377
        </Text>
      </View>

      <Button
        title={"Reset Password"}
        textStyle={{ color: "#fff" }}
        style={styles.resetButton}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 20,
  },
  forgotText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 24,
    marginBottom: 10,
  },
  linkText: {
    color: Colors.gray,
    fontFamily: "Urbanist-Medium",
    marginBottom: 24,
  },
  resetButton: {
    backgroundColor: Colors.primary,
  },
});

export default ForgotPass;

import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Colors } from "../../../constants/Colors";
import BackNav from "../../../components/BackNav";
import Constants from "expo-constants";
import Button from "../../../components/Button";
import Images from "../../../constants/Images";
import Loader from "../../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import Container from "../../../components/Container"; // Import the Container component
import { StatusBar } from "expo-status-bar";

const VerifyId = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate("IdType");
  };

  return (
    <>
      <Container>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <StatusBar barStyle="light-content" backgroundColor={"#fff"} />
          <BackNav />

          <View style={styles.imgContainer}>
            <Image style={styles.verifyImg} source={Images.verifyImg} />
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.verifyIdText}>Verify your photo ID</Text>
            <Text style={styles.verifyDesc}>
              Financial regulations require us to verify your ID. This helps
              prevent someone from creating a EDUFE account in your name.
            </Text>
            <Text style={styles.verifyDesc}>
              After this step, you’ll be ready to start your investments.
            </Text>
          </View>
        </ScrollView>

        {/* Button positioned at the bottom */}
        <View style={styles.btnContainer}>
          <Button
            title={"Continue"}
            style={styles.continueButton}
            textStyle={{ color: "#fff" }}
            onPress={handleContinue}
          />
        </View>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  imgContainer: {
    marginTop: 20,
    width: "100%",
    backgroundColor: Colors.bgGreen,
    height: 220,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  verifyImg: {
    width: 180,
    height: 180,
  },
  headerContainer: {
    marginTop: 20,
  },
  verifyIdText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 24,
    marginBottom: 10,
  },
  verifyDesc: {
    color: Colors.gray,
    fontFamily: "Urbanist-Medium",
    marginBottom: 24,
    fontSize: 14,
  },
  btnContainer: {
    marginBottom: 20, // Adjust this value to change the distance from the bottom
  },
  continueButton: {
    backgroundColor: Colors.primary,
  },
});

export default VerifyId;

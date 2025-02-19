import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import BackNav from "../../../components/BackNav";
import InputField from "../../../components/InputField";
import Loader from "../../../components/Loader";
import { Colors } from "../../../constants/Colors";
import Button from "../../../components/Button";
import Icons from "../../../constants/Icons";
import Container from "../../../components/Container"; // Import the Container component
import Api from "../../../api";
import { useAtom } from "jotai";
import { isLoginAtom, userPersonalDataAtom } from "../../../atoms/global";
import { FaceIdIcon } from "../../../svgs/FaceIdIcon";

const SignIn = () => {
  const navigation = useNavigation();
  const [, setToken] = useAtom(isLoginAtom);
  const [, setUserData] = useAtom(userPersonalDataAtom);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loader state

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const res = await Api.login(formData, setLoading);

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    // console.log(res?.backendTokens, res?.user);

    setUserData(res?.user);
    setToken(res?.backendTokens);

    // navigation.navigate("TabNavigator");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Container>
        <StatusBar barStyle="light-content" backgroundColor={"#fff"} />

        <BackNav />

        <View style={styles.headerContainer}>
          <Text style={styles.logInText}>Log in to your account</Text>
          <Text style={styles.welcomeText}>
            Invest with Confidence, Grow with Purpose
          </Text>
        </View>

        <InputField
          label="Email"
          value={formData.email}
          onChangeText={(value) => handleChange("email", value)}
          autoFocus={true}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <InputField
          label="Password"
          value={formData.password}
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry={true}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            textStyle={{ color: "#fff" }}
            style={styles.loginButton}
            onPress={handleLogin}
          />
          <TouchableOpacity style={styles.faceIdContainer}>
            <FaceIdIcon />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPass")}>
          <Text style={styles.forgotPass}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Loader component with loading state */}
        <Loader isLoading={loading} />
      </Container>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    width: "75%",
  },
  faceIdContainer: {
    height: 61,
    width: 78,
    backgroundColor: Colors.bgColor,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  faceIdIcon: {
    width: 24,
    height: 24,
  },
  forgotPass: {
    fontFamily: "Urbanist-SemiBold",
    fontSize: 14,
    textAlign: "center",
    marginTop: 24,
    textDecorationLine: "underline",
  },
});

export default SignIn;

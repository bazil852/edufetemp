import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import Api from "../api";
import { useAtom } from "jotai";
import { isLoginAtom, userPersonalDataAtom } from "../atoms/global";

const useRegister = () => {
  const navigation = useNavigation();
  const [, setToken] = useAtom(isLoginAtom);
  const [userData, setUserData] = useAtom(userPersonalDataAtom);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [step, setStep] = useState(1);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordMessage(
        value.length >= 8
          ? "Your password is strong"
          : "Please choose a stronger password"
      );
    }
  };

  const handleNext = async () => {
    Keyboard.dismiss();

    const res = await Api.register(
      {
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
      },
      setLoading
    );

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    // console.log(res);
    setUserData(res?.user);
    setToken(res?.token);

    // setLoading(true);
    // navigation.navigate("MobileField");
    navigation.reset({
      index: 0,
      routes: [{ name: "MobileField" }],
    });
  };

  const handleContinue = async () => {
    Keyboard.dismiss();

    const res = await Api.addPhoneNumber(
      userData.id,
      {
        phoneNumber: formData.mobile || "+923022321605",
      },
      setLoading
    );

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    // return;
    navigation.navigate("VerifyScreen", {
      phoneNumber: formData.mobile,
    });
  };

  return {
    formData,
    step,
    passwordMessage,
    loading,
    handleChange,
    handleNext,
    handleContinue,
    setStep,
  };
};

export default useRegister;

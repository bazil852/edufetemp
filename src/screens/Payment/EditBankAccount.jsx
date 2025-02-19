import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import Container from "../../components/Container";
import BackNav from "../../components/BackNav";
import InputField from "../../components/InputField";
import { Colors } from "../../constants/Colors";
import Images from "../../constants/Images";
import Button from "../../components/Button";
import { Switch } from "react-native-paper";

const EditBankAccount = () => {
  const [formData, setFormData] = useState({
    accHolderName: "",
    email: "",
    nickname: "",
    mobile: "",
    bankName: "",
    bankBranch: "",
    payeeBankCountry: "",
    accNumber: "",
    accType: "",
    swiftCode: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const [isSaved, setIsSaved] = useState(false);

  const toggleSwitch = () => setIsSaved(!isSaved);

  return (
    <Container>
      <BackNav />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.logInText}>Added Bank Account</Text>
          <Text style={styles.welcomeText}>
            Add your account info to complete setup
          </Text>
        </View>
        <Text style={styles.heading}>Personal Info</Text>
        <InputField
          label="Account Holder Name"
          value={formData.accHolderName}
          onChangeText={(value) => handleInputChange("accHolderName", value)}
        />
        <InputField
          label="Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
          keyboardType="email-address"
        />
        <InputField
          label="Nickname (Optional)"
          value={formData.nickname}
          onChangeText={(value) => handleInputChange("nickname", value)}
        />
        <View style={styles.mobContainer}>
          <InputField
            label="Mobile Number"
            value={formData.mobile}
            onChangeText={(value) => handleChange("mobile", value)}
            keyboardType="phone-pad" // Automatically focus the input field
          />
          <Image style={styles.flag} source={Images.flag} />
        </View>
        <Text style={styles.heading}>Account Details</Text>
        <InputField
          label="Bank Name"
          value={formData.bankName}
          onChangeText={(value) => handleInputChange("bankName", value)}
        />
        <InputField
          label="Bank Branch"
          value={formData.bankBranch}
          onChangeText={(value) => handleInputChange("bankBranch", value)}
        />
        <InputField
          label="Payee Bank Country"
          value={formData.payeeBankCountry}
          onChangeText={(value) => handleInputChange("payeeBankCountry", value)}
        />
        <InputField
          label="Account Number"
          value={formData.accNumber}
          onChangeText={(value) => handleInputChange("accNumber", value)}
        />
        <InputField
          label="Account Type"
          value={formData.accType}
          onChangeText={(value) => handleInputChange("accType", value)}
        />
        <InputField
          label="SWIFT Code"
          value={formData.swiftCode}
          onChangeText={(value) => handleInputChange("swiftCode", value)}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 16, fontFamily: "Urbanist-Bold" }}>
              Bank Account details
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Urbanist-Medium",
                color: Colors.gray,
              }}
            >
              Save this account for future payments
            </Text>
          </View>
          <Switch
            value={isSaved}
            onValueChange={toggleSwitch}
            color={Colors.primary} // Customize switch color
            style={{ transform: [{ scale: 1.5 }], marginRight: 10 }}
          />
        </View>
      </ScrollView>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Button
          title={"Edit details"}
          style={{ flex: 1, backgroundColor: Colors.primary }}
          textStyle={{ color: "#fff" }}
        />
        <Button
          title={"Delete Account"}
          style={{ flex: 1, borderColor: "#EB001B" }}
          textStyle={{ color: "#EB001B" }}
        />
      </View>
    </Container>
  );
};

export default EditBankAccount;

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 20,
  },
  headerContainer: {
    marginTop: 20,
  },
  logInText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 24,
    marginBottom: 10,
  },
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
  welcomeText: {
    color: Colors.gray,
    fontFamily: "Urbanist-Medium",
    marginBottom: 24,
  },
  heading: {
    fontSize: 20,
    fontFamily: "Urbanist-Bold",
    marginTop: 10,
    marginBottom: 10,
  },
});

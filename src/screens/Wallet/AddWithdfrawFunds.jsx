import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import Container from "../../components/Container";
import BackNav from "../../components/BackNav";
import { Colors } from "../../constants/Colors";
import Button from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddWithdrawFunds = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { isWithdraw } = route.params || { isWithdraw: false };
  const [amount, setAmount] = useState("");

  const handleInputChange = (text) => {
    // Ensure only numeric input is allowed
    if (/^\d*\.?\d*$/.test(text)) {
      setAmount(text);
    }
  };

  return (
    <Container>
      <BackNav />
      <View style={{ flex: 1 }}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.logInText}>
            {isWithdraw ? "Withdraw Funds" : "Add Funds"}
          </Text>
          <Text style={styles.welcomeText}>
            {isWithdraw
              ? "Withdraw your funds from EDUFE wallet"
              : "Add your funds into EDUFE wallet"}
          </Text>
        </View>

        {/* Information Tags */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Min L5.00 investment</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>L2.79 HNL bank transfer fee</Text>
          </View>
        </View>

        {/* Amount Input Section */}
        <View style={styles.amountContainer}>
          <Text style={styles.currency}>L</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={handleInputChange}
            placeholder="00"
            keyboardType="numeric"
            placeholderTextColor={"#000"}
            autoFocus={true}
          />
          <Text style={styles.currency}>.00</Text>
        </View>

        {/* Wallet Balance */}
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Urbanist-SemiBold",
            color: Colors.gray,
            textAlign: "center",
          }}
        >
          You currently have <Text style={{ color: "#000" }}>"AMOUNT"</Text> in
          EDUFE wallet
        </Text>
      </View>

      {/* Preview Details Button */}
      <Button
        title={"Preview Details"}
        style={{ backgroundColor: Colors.primary }}
        textStyle={{ color: "#fff" }}
        onPress={() => {
          navigation.navigate("ConfirmTransfer", { amount });
        }}
      />
    </Container>
  );
};

export default AddWithdrawFunds;

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
  tag: {
    backgroundColor: Colors.offWhite,
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 30,
  },
  tagText: {
    fontSize: 12,
    fontFamily: "Urbanist-SemiBold",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  currency: {
    fontSize: 32,
    fontFamily: "Urbanist-Bold",
  },
  amountInput: {
    fontSize: 32,
    fontFamily: "Urbanist-Bold",
    textAlign: "center",
    color: Colors.black,
  },
});

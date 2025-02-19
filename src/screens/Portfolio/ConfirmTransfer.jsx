import { useNavigation } from "@react-navigation/native";

import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

import Container from "../../components/Container";
import BackNav from "../../components/BackNav";
import { Colors } from "../../constants/Colors";
import DetailRow from "../../components/DetailRow";
import Button from "../../components/Button";

const ConfirmTransfer = ({ route }) => {
  const navigation = useNavigation();
  const { amount } = route.params;
  return (
    <Container>
      <BackNav />
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.verifyIdText}>Withdraw Funds</Text>
          <Text style={styles.verifyDesc}>
            Sending dividends to your account
          </Text>
        </View>
        <Text
          style={{
            fontSize: 32,
            fontFamily: "Urbanist-ExtraBold",
            marginBottom: 30,
          }}
        >
          L{amount}.00
        </Text>
        <DetailRow label={"From"} value="" />
        <View style={styles.divider} />
        <DetailRow label={"To"} value="" />
        <View style={styles.divider} />
        <DetailRow label={"Date"} value="" />
        <View style={styles.divider} />
        <DetailRow label={"Bank Fee"} value="" />
        <View style={styles.divider} />
        <DetailRow label={"Total"} value="" />
      </ScrollView>
      <Button
        title="Confirm Transfer"
        style={{ backgroundColor: Colors.primary, marginBottom: 20 }}
        textStyle={{ color: "#fff" }}
        onPress={() => navigation.navigate("TransferOTP", { amount })}
      />
    </Container>
  );
};

export default ConfirmTransfer;

const styles = StyleSheet.create({
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
  divider: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 1,
    marginVertical: 10,
  },
});

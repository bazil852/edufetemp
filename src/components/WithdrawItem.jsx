import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";
import Icon from "react-native-vector-icons/Ionicons";

const WithdrawItem = ({ payout }) => {
  return (
    <TouchableOpacity style={styles.investmentContainer}>
      <View style={styles.investmentInfo}>
        <View style={[styles.iconWrapper]}>
          <Image source={payout.icon} style={styles.icon} />
        </View>
        <View style={styles.investmentDetails}>
          <Text style={styles.investmentTitle}>{payout.title}</Text>
          <Text style={styles.investmentMaturity}>{payout.date}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.investmentAmount}>{payout.amount}</Text>
        <Icon name="chevron-forward" size={20} color="#000" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  investmentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: Colors.offWhite,
  },
  investmentInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: "#5AD066",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginRight: 12,
  },
  icon: {
    width: 22,
    height: 22,
  },
  investmentDetails: {
    flexDirection: "column",
  },
  investmentTitle: {
    fontSize: 16,
    fontFamily: "Urbanist-Bold",
  },
  investmentMaturity: {
    fontFamily: "Urbanist-Medium",
    color: Colors.gray,
    marginTop: 4,
    fontSize: 12,
    width: 150,
  },
  investmentAmount: {
    alignItems: "flex-end",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 14,
  },
  investmentDate: {
    textAlign: "right",
    fontFamily: "Urbanist-Medium",
    fontSize: 12,
    marginTop: 7,
  },
});

export default WithdrawItem;

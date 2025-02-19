// components/TransactionItem.js
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/Colors";

const TransactionItem = ({ transaction, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.transactionRow}>
      <View style={styles.transactionIconWrapper}>
        <Image source={transaction.icon} style={styles.transactionIcon} />
      </View>
      <View style={styles.transactionDetails}>
        <View style={styles.transactionInfoRow}>
          <Text style={styles.transactionName}>{transaction.name}</Text>
          <Text style={styles.transactionAmount}>{transaction.amount}</Text>
        </View>
        <View style={styles.transactionDescriptionRow}>
          <Text style={{ color: Colors.gray }}>{transaction.type} . </Text>
          <Text style={styles.transactionMethod}>{transaction.method}</Text>
          <Text style={styles.transactionDate}>{transaction.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  transactionRow: {
    flexDirection: "row",
  },
  transactionIconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: Colors.offWhite,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  transactionIcon: {
    width: 24,
    height: 24,
  },
  transactionDetails: {
    marginLeft: 12,
    flex: 1,
  },
  transactionInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  transactionName: {
    fontFamily: "Urbanist-Bold",
    fontSize: 16,
  },
  transactionAmount: {
    fontFamily: "Urbanist-Bold",
    fontSize: 16,
  },
  transactionDescriptionRow: {
    flexDirection: "row",
    marginTop: 2,
  },
  transactionMethod: {
    width: 100,
    color: Colors.gray,
    fontSize: 14,
    fontFamily: "Urbanist-Medium",
  },
  transactionDate: {
    marginLeft: "auto",
    color: Colors.gray,
    fontSize: 14,
    fontFamily: "Urbanist-Medium",
  },
});

export default TransactionItem;

// screens/TransactionDetailScreen.js
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Container from "../../components/Container";
import BackNav from "../../components/BackNav";
import { Colors } from "../../constants/Colors";
import Icons from "../../constants/Icons";
import Selectable from "../../components/Selectable";
import { transactionDetails } from "../../utils/Index";
import DetailRow from "../../components/DetailRow";

const TransactionDetail = ({ route }) => {
  const { transaction } = route.params;
  const [selectedPeriod, setSelectedPeriod] = useState("Updates");

  // Define the time periods
  const timePeriods = ["Updates", "Details"];

  // Filter transaction details based on the transaction status
  const filteredTransactionDetails = [transaction.details];

  // Define a mapping for status colors
  const statusColors = {
    Completed: Colors.bgGreen,
    Pending: "#FF855C", // Red for pending
  };

  // Function to get status text color based on status
  const getStatusTextColor = (status) => {
    return statusColors[status] || statusColors.Default;
  };

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <BackNav />
        <TouchableOpacity style={styles.supportButton}>
          <Image style={styles.iconSupport} source={Icons.support} />
          <Text style={styles.supportText}>Support</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.transactionInfo}>
        <View style={styles.transactionIconWrapper}>
          <Image source={transaction.icon} style={styles.icon} />
        </View>
        <Text style={styles.amountText}>{transaction.amount}</Text>
        <View
          style={[
            styles.statusContainer,
            {
              backgroundColor: statusColors[transaction.status],
            },
          ]}
        >
          <Text style={styles.statusText}>Transfer {transaction.status}</Text>
        </View>
      </View>

      <View style={styles.dividerLarge} />
      <Selectable
        items={timePeriods}
        selectedItem={selectedPeriod}
        setSelectedItem={setSelectedPeriod}
      />
      {selectedPeriod === "Updates" && (
        <>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginTop: 30,
              gap: 10,
            }}
          >
            <Image source={Icons.checkGreen} style={styles.icon} />
            <View>
              <Text style={{ fontSize: 16, fontFamily: "Urbanist-SemiBold" }}>
                {transaction.type === "Sent"
                  ? "Sent from EDUFE Wallet"
                  : "Sent from Bank Account"}
              </Text>

              <Text
                style={{
                  color: Colors.gray,
                  fontSize: 14,
                  fontFamily: "Urbanist-Medium",
                }}
              >
                {transaction.date} , {transaction.details.time}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: 2,
              height: 70,
              backgroundColor: Colors.bgGreen,
              marginLeft: 16,
              marginVertical: 10,
            }}
          ></View>
          <View
            style={{ flexDirection: "row", alignItems: "flex-start", gap: 10 }}
          >
            <Image
              source={Icons.checkGreen}
              style={[
                styles.icon,
                transaction.status === "Pending" && { tintColor: Colors.gray },
              ]}
            />

            <View>
              <Text style={{ fontSize: 16, fontFamily: "Urbanist-SemiBold" }}>
                {transaction.type === "Sent"
                  ? "Sent to your Bank Account"
                  : "Added to EDUFE Wallet "}
              </Text>
              <Text
                style={{
                  color: Colors.gray,
                  fontSize: 14,
                  fontFamily: "Urbanist-Medium",
                }}
              >
                {transaction.date}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <DetailRow
            label={"Reference ID"}
            value={transaction.details.referenceId}
            iconSource={Icons.copy}
          />
          <View style={styles.divider} />
          <DetailRow label={"Amount added"} value={transaction.amount} />
        </>
      )}
      {selectedPeriod === "Details" && (
        <FlatList
          data={filteredTransactionDetails}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.detailRowContainer}>
              {[
                { label: "Status", value: item.status, isStatus: true },
                { label: "From", value: item.from },
                { label: "Bank Fee", value: item.bankFee },
                {
                  label: "Date & Time",
                  value: `${transaction.date} ${item.time}`,
                },
                { label: "To", value: item.to },
                { label: "Email", value: item.email },
                { label: "Account Sent", value: item.accountSent },
              ].map((row, index) => (
                <React.Fragment key={index}>
                  <DetailRow
                    label={row.label}
                    value={
                      row.isStatus ? (
                        <Text style={{ color: getStatusTextColor(row.value) }}>
                          {row.value}
                        </Text>
                      ) : (
                        row.value
                      )
                    }
                    labelStyles={{ fontSize: 16, color: "#868686" }}
                    valueStyles={{ fontSize: 16, color: "#141414" }}
                  />
                  {index < 6 && <View style={styles.divider} />}
                </React.Fragment>
              ))}
            </View>
          )}
          contentContainerStyle={styles.flatList}
        />
      )}
    </Container>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  transactionInfo: {
    alignItems: "center",
  },
  transactionIconWrapper: {
    width: 80,
    height: 80,
    backgroundColor: Colors.offWhite,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  amountText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 24,
    marginTop: 20,
  },
  statusContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
    marginTop: 10,
  },
  statusText: {
    fontSize: 12,
    fontFamily: "Urbanist-SemiBold",
    color: "white",
  },
  supportButton: {
    backgroundColor: Colors.offWhite,
    width: 104,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    gap: 5,
    marginTop: 10,
  },
  icon: {
    width: 36,
    height: 36,
  },
  iconSupport: {
    width: 20,
    height: 20,
  },
  supportText: {
    fontSize: 12,
  },
  dividerLarge: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 20,
    marginVertical: 30,
  },
  flatList: {
    marginBottom: 30,
  },
  detailRowContainer: {
    marginTop: 30,
  },
  divider: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 1,
    marginVertical: 10,
  },
});

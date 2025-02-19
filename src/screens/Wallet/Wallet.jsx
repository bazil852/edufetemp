// screens/WalletScreen.js
import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import Container from "../../components/Container";
import { StatusBar } from "expo-status-bar";
import Icons from "../../constants/Icons";
import { Colors } from "../../constants/Colors";
import Button from "../../components/Button";
import { funds, transactions } from "../../utils/Index";
import TransactionItem from "../../components/TransactionItem"; // Import TransactionItem
import Separator from "../../components/Separator";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "../../components/BottomSheet";
import FundItem from "../../components/FundItem";

const WalletScreen = () => {
  const navigation = useNavigation();

  const refBottomSheet = useRef(); // Create a reference for your BottomSheet
  const withdrawSheetRef = useRef(null);
  const [selectedFund, setSelectedFund] = useState(null);

  const openSheet = () => {
    refBottomSheet.current.open(); // Open the custom BottomSheet
  };

  const handleFundSelection = (id) => {
    setSelectedFund(id); // Set the selected fund's ID
  };

  const closeSheet = () => {
    refBottomSheet.current.close(); // Close the custom BottomSheet
  };
  const renderFundItem = ({ item }) => (
    <FundItem
      fund={item}
      isSelected={selectedFund === item.id}
      onSelect={() => handleFundSelection(item.id)} // Select fund on press
    />
  );
  const handleTransactionPress = (transaction) => {
    navigation.navigate("TransactionDetail", { transaction });
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={"#fff"} />
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.supportButton}>
          <Image style={styles.icon} source={Icons.support} />
          <Text style={styles.supportText}>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => {
            navigation.navigate("PaymentMethod");
          }}
        >
          <Image style={styles.icon} source={Icons.money} />
          <Text style={styles.paymentText}>Payment method</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.walletInfo}>
        <Text style={styles.walletAmount}>
          {/* Amount here */} "Amount"<Text style={styles.currency}>HNL</Text>
        </Text>
        <Text style={styles.walletText}>Your Wallet</Text>
      </View>
      <View style={styles.buttonRow}>
        <View style={styles.buttonWrapper}>
          <Button
            style={styles.addFundsButton}
            textStyle={styles.addFundsButtonText}
            title={"Add Funds"}
            onPress={openSheet}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            style={[
              styles.withdrawButton,
              transactions.length === 0 && styles.disabledButton, // Apply a disabled style when no transactions
            ]}
            textStyle={[
              styles.withdrawButtonText,
              transactions.length === 0 && styles.disabledButtonText, // Update text style if disabled
            ]}
            title={"Withdraw"}
            onPress={
              transactions.length > 0
                ? () => withdrawSheetRef.current?.open()
                : null
            } // Conditionally disable onPress
          />
        </View>
      </View>
      <View style={styles.divider}></View>

      <View style={styles.transactionHeader}>
        <View style={styles.row}>
          <Text style={styles.title}>Transactions history</Text>

          <Text style={styles.transactions}>
            {transactions.length} total transactions
          </Text>
        </View>
        <View style={styles.filterButton}>
          <Image source={Icons.filter} style={styles.filterIcon} />
        </View>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            onPress={() => handleTransactionPress(item)}
          />
        )}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={EmptyList} // Render EmptyList when no transactions
        contentContainerStyle={styles.scrollViewContent}
      />
      <BottomSheet
        ref={refBottomSheet}
        title="Add Funds From"
        subtitle={null}
        description={null}
        imageSource={null}
        height={450} // Set height as needed
      >
        <FlatList
          data={funds}
          keyExtractor={(fund) => fund.id.toString()}
          renderItem={renderFundItem}
        />
        <Button
          title={"Proceed"}
          style={{ backgroundColor: Colors.primary }}
          textStyle={{ color: "#fff" }}
          onPress={() =>
            navigation.navigate("AddWithdrawFunds", { isWithdraw: false })
          }
        />
      </BottomSheet>
      <BottomSheet
        ref={withdrawSheetRef}
        title="Withdraw Funds to"
        subtitle={null}
        description={null}
        imageSource={null}
        height={450} // Set height as needed
      >
        <FlatList
          data={funds}
          keyExtractor={(fund) => fund.id.toString()}
          renderItem={({ item }) => (
            <FundItem
              fund={item}
              isSelected={selectedFund === item.id}
              onSelect={() => handleFundSelection(item.id)} // Select fund on press
            />
          )}
        />
        <Button
          title={"Proceed"}
          style={{ backgroundColor: Colors.primary }}
          textStyle={{ color: "#fff" }}
          onPress={() =>
            navigation.navigate("AddWithdrawFunds", { isWithdraw: true })
          }
        />
      </BottomSheet>
    </Container>
  );
};

const EmptyList = () => (
  <View style={styles.emptyListContainer}>
    <Text style={styles.emptyListText}>No transactions available.</Text>
  </View>
);

export default WalletScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  paymentButton: {
    backgroundColor: Colors.offWhite,
    width: 152,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    gap: 5,
    marginTop: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  disabledButton: {
    backgroundColor: Colors.offWhite, // Set a grayed-out background
  },
  disabledButtonText: {
    color: "#fff", // Set a lighter text color
  },

  supportText: {
    fontSize: 12,
  },
  paymentText: {
    fontSize: 12,
  },
  walletInfo: {
    marginTop: 20,
  },
  walletAmount: {
    fontSize: 40,
    fontFamily: "Urbanist-ExtraBold",
  },
  currency: {
    fontSize: 14,
    fontFamily: "Urbanist-SemiBold",
  },
  walletText: {
    fontSize: 16,
    fontFamily: "Urbanist-Medium",
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
    marginTop: 20,
  },
  buttonWrapper: {
    flex: 1,
  },
  addFundsButton: {
    backgroundColor: Colors.primary,
  },
  addFundsButtonText: {
    color: "#fff",
  },
  withdrawButton: {
    backgroundColor: Colors.offWhite,
  },
  withdrawButtonText: {
    color: Colors.primary,
  },
  divider: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 2,
    marginTop: 20,
  },
  transactionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  row: {
    marginVertical: 12,
  },
  title: {
    fontFamily: "Urbanist-Bold",
    fontSize: 20,
  },
  transactions: {
    fontFamily: "Urbanist-Medium",
    color: Colors.gray,
  },
  filterButton: {
    backgroundColor: Colors.offWhite,
    height: 32,
    width: 47,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  filterIcon: {
    width: 24,
    height: 24,
  },
  emptyListContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyListText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 18,
    color: Colors.primary,
  },
});

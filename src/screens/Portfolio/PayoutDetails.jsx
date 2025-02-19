import { useNavigation } from "@react-navigation/native";

import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

import { Colors } from "../../constants/Colors";
import Container from "../../components/Container";
import BackNav from "../../components/BackNav";
import { dividendDetails, funds } from "../../utils/Index";
import DetailRow from "../../components/DetailRow";
import Button from "../../components/Button";
import BottomSheet from "../../components/BottomSheet";
import Icons from "../../constants/Icons";
import FundItem from "../../components/FundItem";

const PayoutDetails = ({ route }) => {
  const navigation = useNavigation();
  const [selectedFund, setSelectedFund] = useState(null);
  const { payout } = route.params; // Get payout data from params
  const bottomSheetRef = useRef(null); // Create a ref for BottomSheet
  const confirmationSheetRef = useRef(null); // Create a ref for Confirmation BottomSheet
  const withdrawSheetRef = useRef(null); // Create a ref for Withdraw BottomSheet

  // Function to open the BottomSheet
  const handleReinvestPress = () => {
    bottomSheetRef.current?.open(); // Open the BottomSheet
  };
  const handleFundSelection = (id) => {
    setSelectedFund(id); // Set the selected fund's ID
  };
  // Function to handle confirmation of reinvestment
  const handleConfirmReinvest = () => {
    // Close the reinvestment BottomSheet
    bottomSheetRef.current?.close();
    // Open the confirmation BottomSheet
    confirmationSheetRef.current?.open();
  };

  const handleWithdrawPress = () => {
    withdrawSheetRef.current?.open(); // Open the BottomSheet
  };

  return (
    <Container style={styles.container}>
      <BackNav />

      <View style={styles.payoutInfo}>
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: payout.backgroundColor },
          ]}
        >
          <Image source={payout.icon} style={styles.icon} />
        </View>
        <Text style={styles.amountText}>{payout.amount}</Text>
        <Text style={styles.titleText}>{payout.title}</Text>
        <Text style={styles.availabilityText}>{payout.availability}</Text>
      </View>

      <View style={styles.dividerLarge} />

      <FlatList
        style={styles.flatList}
        data={dividendDetails}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => (
          <Text style={styles.headerText}>Dividend Details</Text>
        )}
        renderItem={({ item }) => (
          <DetailRow
            label={item.label}
            value={item.value}
            bold={item.label === "You’ve Received"}
          />
        )}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />

      <View style={styles.buttonContainer}>
        <Button
          title={"Reinvest"}
          style={styles.reinvestButton}
          textStyle={styles.reinvestText}
          onPress={handleReinvestPress} // Add onPress handler
        />
        <Button
          title={"Withdraw"}
          style={styles.withdrawButton}
          textStyle={styles.withdrawText}
          onPress={handleWithdrawPress}
        />
      </View>

      {/* BottomSheet component for Reinvestment */}
      <BottomSheet
        ref={bottomSheetRef}
        title={`Reinvest ${""}`}
        subtitle={`Are you sure you want to reinvest ${""} dividends into ${""} of Jon Portfolio?`}
        imageSource={Icons.info} // Update with your image path
        description="If yes then in a few minutes your portfolio will be updated"
        height={400} // Adjust height as needed
      >
        <View style={{ marginTop: 20, gap: 10 }}>
          <Button
            title={"Yes, Reinvest Amount"}
            style={{ backgroundColor: Colors.primary }}
            textStyle={{ color: "#fff" }}
            onPress={handleConfirmReinvest} // Handle confirmation
          />
          <Button
            title={"No, Don't Reinvest"}
            style={{ borderColor: Colors.primary, borderWidth: 1 }}
            textStyle={{ color: Colors.primary }}
            onPress={() => bottomSheetRef.current?.close()} // Close without reinvesting
          />
        </View>
      </BottomSheet>

      {/* Confirmation BottomSheet for Successful Reinvestment */}
      <BottomSheet
        ref={confirmationSheetRef}
        title={"Reinvested Successfully"}
        subtitle={`You have successfully reinvested ${payout.amount} dividends into ${payout.title}.`}
        imageSource={Icons.check}
        height={280} // Adjust height as needed
      >
        <Button
          title={"Close"}
          style={{ backgroundColor: Colors.primary, marginTop: 20 }}
          textStyle={{ color: "#fff" }}
          onPress={() => confirmationSheetRef.current?.close()} // Close confirmation
        />
      </BottomSheet>
      {/* BottomSheet for Withdraw*/}
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
          onPress={() => navigation.navigate("ConfirmTransfer")}
        />
      </BottomSheet>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  payoutInfo: {
    gap: 8,
    alignItems: "center",
  },
  iconWrapper: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  icon: {
    width: 36,
    height: 36,
  },
  amountText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 24,
    textAlign: "center",
  },
  titleText: {
    fontFamily: "Urbanist-SemiBold",
    fontSize: 16,
    textAlign: "center",
  },
  availabilityText: {
    color: "white",
    backgroundColor: "#5AD066",
    padding: 5,
    textAlign: "center",
    width: "35%",
    borderRadius: 30,
    alignSelf: "center",
  },
  dividerLarge: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 20,
    marginVertical: 30,
  },
  flatList: {
    marginBottom: 30,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Urbanist-Bold",
    marginVertical: 20,
  },
  divider: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 1,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  reinvestButton: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  reinvestText: {
    color: Colors.primary,
  },
  withdrawButton: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  withdrawText: {
    color: "#fff",
  },
});

export default PayoutDetails;

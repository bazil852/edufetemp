import { StatusBar } from "expo-status-bar";
import { Divider } from "react-native-paper";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";

import Container from "../../components/Container";
import BackNav from "../../components/BackNav";
import Selectable from "../../components/Selectable";
import { Colors } from "../../constants/Colors";
import Icons from "../../constants/Icons";
import { payouts, withdraws } from "../../utils/Index";
import PayoutItem from "../../components/PayoutItem";
import WithdrawItem from "../../components/WithdrawItem";

const WithdrawFunds = ({ navigation }) => {
  const portfolios = ["Jon Portfolio", "Jon Investments", "Jonathon Portfolio"];
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  const handlePayoutPress = (payout) => {
    navigation.navigate("PayoutDetails", { payout }); // Navigate to PayoutDetails screen
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
      <BackNav />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Selectable
          items={portfolios}
          selectedItem={selectedPeriod}
          setSelectedItem={setSelectedPeriod}
          label="Withdraw Funds"
          description="See all of your portfolio’s funds"
          labelStyle={{ fontSize: 24, marginTop: 20 }}
        />
        <Divider style={{ marginVertical: 20 }} />

        <Text style={[styles.portfolioTitle, { marginVertical: 20 }]}>
          Pending Payouts
        </Text>

        {/* FlatList for Pending Payouts */}
        <FlatList
          data={payouts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <PayoutItem payout={item} onPress={() => handlePayoutPress(item)} />
          )}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />

        <View style={[styles.investmentsHeader, { marginVertical: 20 }]}>
          <View style={styles.portfolioInfo}>
            <Text style={styles.portfolioTitle}>Withdrawn Amounts</Text>
          </View>
          <View style={styles.filterButton}>
            <Image source={Icons.filter} style={styles.filterIcon} />
          </View>
        </View>

        {/* FlatList for Withdrawn Amounts */}
        <FlatList
          data={withdraws}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <WithdrawItem payout={item} />}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </ScrollView>
    </Container>
  );
};

export default WithdrawFunds;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  portfolioTitle: {
    fontFamily: "Urbanist-Bold",
    fontSize: 20,
  },
  investmentsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
});

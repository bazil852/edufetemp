import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { payoutDetail, withdrawnAmounts } from "../../utils/Index";
import InvestmentItem from "../../components/InvestmentItem";
import { Colors } from "../../constants/Colors";
import Icons from "../../constants/Icons";

const renderInvestmentItem = ({ item }) => (
  <InvestmentItem isEstimated={true} investment={item} />
);
const renderWithdrawnAmounts = ({ item }) => (
  <TouchableOpacity style={styles.investmentContainer}>
    <View style={styles.investmentInfo}>
      <View style={[styles.iconWrapper, item.iconStyles]}>
        <Image source={Icons.checkGreen} style={styles.icon} />
      </View>
      <View>
        <Text style={styles.investmentTitle}>{item.title}</Text>
        <Text style={styles.investmentDate}>{item.date}</Text>
      </View>
    </View>
    <Text style={styles.investmentAmount}>{item.amount}</Text>
    <Image source={Icons.rightArrow} style={{ width: 20, height: 20 }} />
  </TouchableOpacity>
);
const Payouts = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Pending Payouts</Text>
      <FlatList
        data={payoutDetail}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderInvestmentItem}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      />
      <View style={styles.sectionDivider}></View>

      <View style={styles.investmentsHeader}>
        <Text style={styles.portfolioTitle}>Withdrawn Amounts</Text>

        <View style={styles.filterButton}>
          <Image source={Icons.filter} style={styles.filterIcon} />
        </View>
      </View>
      <FlatList
        data={withdrawnAmounts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderWithdrawnAmounts}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      />
    </ScrollView>
  );
};

export default Payouts;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Urbanist-Bold",
    marginVertical: 20,
  },
  sectionDivider: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 20,
    marginVertical: 20,
  },
  investmentsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  portfolioInfo: {
    marginVertical: 12,
  },
  portfolioTitle: {
    fontFamily: "Urbanist-Bold",
    fontSize: 20,
  },
  portfolioAmount: {
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
  investmentContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  investmentInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginRight: 12,
  },
  icon: {
    width: 40,
    height: 40,
  },
  investmentTitle: {
    fontSize: 16,
    fontFamily: "Urbanist-Bold",
  },
  investmentDate: {
    fontSize: 12,
    fontFamily: "Urbanist-Medium",
    color: Colors.gray,
  },
  investmentAmount: {
    fontSize: 14,
    fontFamily: "Urbanist-SemiBold",
    marginLeft: "auto",
    marginRight: 10,
  },
});

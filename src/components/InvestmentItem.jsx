import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ProgressBar } from "./ProgressBar";
import { Colors } from "../constants/Colors";
import formatCurrency from "../utils/currency";
import getCategoryIcon, { backgroundColor } from "../utils/icons";
import Icon from "react-native-vector-icons/MaterialIcons"; // Using MaterialIcons for ChevronRight icon

const InvestmentItem = ({ investment, index = 0, isEstimated }) => {
  return (
    <TouchableOpacity style={[styles.investmentContainer]}>
      <View style={styles.investmentInfo}>
        <View
          style={[
            styles.iconWrapper,
            {
              backgroundColor: backgroundColor[index % backgroundColor.length],
            }, // Dynamic background color
          ]}
        >
          <Image
            source={getCategoryIcon(investment?.investmentOpportunity?.name)}
            style={styles.icon}
          />
        </View>
        <View style={styles.investmentDetails}>
          <Text style={styles.investmentTitle}>
            {investment?.investmentOpportunity?.name}
          </Text>
          <ProgressBar
            progress={
              investment.currentMaturityPercentage
                ? investment.currentMaturityPercentage?.toFixed(2)
                : 0
            }
          />
          <Text style={styles.investmentMaturity}>
            Matures on {new Date(investment.maturityDate).toDateString()}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.investmentAmount}>
          {formatCurrency(investment.totalInvested)}
        </Text>
        <Text style={styles.investmentDate}>{investment.date}</Text>
      </View>
      {isEstimated && (
        <Icon name="chevron-right" size={24} color={Colors.gray} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  investmentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: Colors.offWhite,
    marginHorizontal: 12,
  },
  investmentInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: "#34D1A5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginRight: 12,
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
  },
  investmentAmountContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginLeft: "auto",
  },
  investmentAmount: {
    fontFamily: "Urbanist-SemiBold",
    fontSize: 14,
  },
  investmentDate: {
    fontFamily: "Urbanist-Medium",
    fontSize: 12,
    marginTop: 7,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default InvestmentItem;

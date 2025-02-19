import React from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import getCategoryIcon, { backgroundColor } from "../utils/icons";

const InvestmentCard = ({ investment, onPress, index = 0 }) => {
  console.log(investment);
  return (
    <TouchableOpacity style={styles.investmentCard} onPress={onPress}>
      <View style={styles.investmentInfo}>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: "#34D1A5",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            marginRight: 12,
            backgroundColor: backgroundColor[index % backgroundColor.length],
          }}
        >
          <Image
            source={getCategoryIcon(investment?.name)}
            style={[styles.icon]}
          />
        </View>

        <View style={styles.investmentInfo}>
          <Text style={styles.title}>{investment.name}</Text>
          <Text style={styles.returns}>
            {investment.minReturn + " - " + investment.maxReturn + "% returns"}
          </Text>
          <Text style={styles.risk}>{investment.riskLevel + " Risk"}</Text>
        </View>
      </View>
      {/* <Text style={styles.investedAmount}>
      Invested: {investment.investedAmount}
    </Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  investmentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    // height: 130,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  investmentDetails: {
    flexDirection: "row",
    gap: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  investmentInfo: {
    gap: 10,
  },
  title: {
    fontFamily: "Urbanist-Bold",
    fontSize: 16,
  },
  returns: {
    color: "#31C440",
    fontFamily: "Urbanist-Medium",
  },
  risk: {
    backgroundColor: Colors.offWhite,
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: "center",
    borderRadius: 20,
    fontFamily: "Urbanist-Regular",
  },
  investedAmount: {
    fontFamily: "Urbanist-Regular",
    fontSize: 14,
    color: Colors.gray,
  },
});

export default InvestmentCard;

import moment from "moment";
import { useNavigation } from "@react-navigation/native";

import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

import { ProgressBar } from "./ProgressBar";
import { Colors } from "../constants/Colors";
import getCategoryIcon, { backgroundColor } from "../utils/icons";
import formatCurrency from "../utils/currency";

const MarketplaceItem = ({ Item, index }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.investmentContainer}
      onPress={() => {
        navigation.navigate("MarketPlaceDetail", { portfolioDetails: Item });
      }}
    >
      <View style={styles.investmentInfo}>
        <View style={styles.investmentDetails}>
          <Text style={styles.investmentTitle}>{Item?.portfolio?.name}</Text>
          <ProgressBar
            progress={Item?.portfolio?.portfolioMaturityPercentage}
          />

          <Text style={styles.Item}>
            By {Item?.portfolio?.portfolioMaturityDate} -{" "}
            {Number(Item?.portfolio?.totalTenure) + " Years"}
          </Text>
          <View style={{ marginTop: 20, flexDirection: "row" }}>
            {Item?.portfolio?.investments &&
              Item?.portfolio?.investments?.length > 0 &&
              Item?.portfolio?.investments?.map((iconData, index) => (
                <View
                  style={[
                    styles.iconWrapper,
                    {
                      backgroundColor:
                        backgroundColor[index % backgroundColor.length],
                    },
                  ]}
                  key={iconData?.id}
                >
                  <Image
                    source={getCategoryIcon(
                      iconData?.investmentOpportunity?.name
                    )}
                    style={styles.icon}
                  />
                </View>
              ))}
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Urbanist-Medium",
                marginLeft: 5,
                marginTop: 5,
              }}
            >
              Avg Return: {Item?.portfolio?.totalAverageReturnPercentage + "%"}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.investmentAmount}>
          {formatCurrency(Item.price ?? Item.totalValue)}
        </Text>
        {Item.discountPercentage > 0 && (
          <View
            style={{
              backgroundColor: "#31C4401A",
              padding: 5,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <Text style={styles.investmentBonus}>
              {Item.discountPercentage}% Bonus
            </Text>
          </View>
        )}

        {Item.updatedAt && (
          <Text style={styles.investmentTime}>
            {moment(Item.updatedAt).endOf("day").fromNow()}{" "}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  investmentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    width: "100%",
  },
  investmentInfo: {
    flexDirection: "row",
  },
  icon: {
    width: 16,
    height: 16,
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
  investmentAmount: {
    alignItems: "flex-end",
    fontFamily: "Urbanist-Bold",
    fontSize: 16,
  },
  investmentBonus: {
    textAlign: "center",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 14,
    color: "#31C440",
  },
  investmentTime: {
    marginTop: 20,
    textAlign: "right",
    color: Colors.gray,
  },
  iconWrapper: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginRight: 12,
  },
});

export default MarketplaceItem;

import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import { Colors } from "../../constants/Colors";
import formatCurrency from "../../utils/currency";
import getCategoryIcon, { backgroundColor } from "../../utils/icons";
import PerformanceChart from "../../components/performanceChart";

const Stats = ({ data }) => {
  return (
    <>
      <ScrollView style={{ padding: 12, marginBottom: 30 }}>
        <FlatList
          style={{ marginBottom: 30 }}
          ListHeaderComponent={() => (
            <>
              <Text style={styles.headerText}>Recent Investments</Text>
            </>
          )}
          data={data?.recentInvestments}
          keyExtractor={(item, index) => index.toString()} // Unique key for each item
          renderItem={({ item, index }) => (
            <View style={styles.investmentContainer}>
              <View style={styles.investmentInfo}>
                <View
                  style={[
                    styles.iconWrapper,
                    {
                      backgroundColor:
                        backgroundColor[index % backgroundColor.length],
                    },
                  ]}
                >
                  <Image
                    source={getCategoryIcon(item.name)}
                    style={styles.icon}
                  />
                </View>
                <View style={{ gap: 3 }}>
                  <Text style={styles.investmentTitle}>{item.name}</Text>
                  <Text style={styles.investmentDate}>
                    {new Date(item.date).toDateString()}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.investmentAmount}>
                  {formatCurrency(item.amountInvested)}
                </Text>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
        />
        <Text style={styles.headerText}>Performance Over Time</Text>
        <PerformanceChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [
              {
                data: [50, 100, 200, 250, 300], // Car Rentals
                color: (opacity = 1) => `rgba(0, 200, 83, ${opacity})`, // Green
                strokeWidth: 2,
              },
              {
                data: [80, 120, 180, 230, 280], // Real Estate
                color: (opacity = 1) => `rgba(103, 58, 183, ${opacity})`, // Purple
                strokeWidth: 2,
              },
              {
                data: [60, 80, 150, 190, 220], // Shops
                color: (opacity = 1) => `rgba(255, 152, 0, ${opacity})`, // Orange
                strokeWidth: 2,
              },
            ],
            legend: ["Car Rentals", "Real Estate", "Shops"],
          }}
        />
        <FlatList
          style={{ marginBottom: 30 }}
          ListHeaderComponent={() => (
            <>
              <Text style={styles.headerText}>Future Projections</Text>
            </>
          )}
          data={data?.futureProjections?.opportunities}
          keyExtractor={(item, index) => index.toString()} // Unique key for each item
          renderItem={({ item, index }) => {
            return (
              <View style={styles.investmentContainer}>
                <View style={styles.investmentInfo}>
                  <View
                    style={[
                      styles.iconWrapper,
                      {
                        backgroundColor:
                          backgroundColor[index % backgroundColor.length],
                      },
                    ]}
                  >
                    <Image
                      source={getCategoryIcon(item.name)}
                      style={styles.icon}
                    />
                  </View>
                  <View style={{ gap: 3 }}>
                    <Text style={styles.investmentTitle}>{item.name}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.investmentDate}>
                        {formatCurrency(item.amount)}{" "}
                      </Text>
                      <Text style={styles.investmentDate}>*</Text>
                      <Text style={styles.investmentDate}>
                        {" "}
                        {item.returnRate}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.investmentAmount}>
                    {formatCurrency(item.projection)}
                  </Text>
                </View>
              </View>
            );
          }}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
        />
      </ScrollView>
    </>
  );
};

export default Stats;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontFamily: "Urbanist-Bold",
    marginBottom: 20,
  },
  investmentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    width: 22,
    height: 22,
  },
  investmentTitle: {
    fontSize: 16,
    fontFamily: "Urbanist-Bold",
  },
  investmentAmount: {
    alignItems: "flex-end",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 14,
  },
  investmentDate: {
    fontFamily: "Urbanist-Medium",
    fontSize: 12,
    color: Colors.gray,
  },

  divider: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 1,
    marginVertical: 10, // Adds space around the divider
  },
});

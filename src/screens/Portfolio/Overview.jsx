import { Image, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

import { Colors } from "../../constants/Colors";
import DetailRow from "../../components/DetailRow";
import formatCurrency from "../../utils/currency";
import getCategoryIcon, { backgroundColor } from "../../utils/icons";

const Overview = ({ data }) => {
  if (!data) {
    return null;
  }

  const portfolioDetails = [
    {
      label: "Current Portfolio Value",
      value: formatCurrency(data?.portfolioDetails?.currentPortfolioValue),
    },
    { label: "Tenure Date", value: data?.portfolioDetails?.tenureDate },
    {
      label: "Total Tenure",
      value: Number(data?.portfolioDetails?.totalTenure) + " Years",
    },
    {
      label: "Portfolio Completed",
      value: data?.portfolioDetails?.portfolioCompleted + "%",
    },
    {
      label: "Total Average Return",
      value: data?.portfolioDetails?.totalAverageReturn + "%",
    },
    {
      label: "Initial Investment",
      value: formatCurrency(data?.portfolioDetails?.initialInvestment),
    },
    {
      label: "Current Portfolio Value",
      value: formatCurrency(data?.portfolioDetails?.totalReturns),
    },
  ];

  const performanceSummaryData = [
    {
      title: "Overall Performance",
      description: "Portfolio has grown by ",
      percentage: data?.performanceSummary?.overallPerformance + "%",
    },
    {
      title: "Top Performing Investment",
      description:
        data?.performanceSummary?.topPerformingInvestment?.name + ", with an ",
      percentage:
        data?.performanceSummary?.topPerformingInvestment?.return + "%",
    },
    {
      title: "Lowest Performing Investment",
      description:
        data?.performanceSummary?.lowestPerformingInvestment?.name +
        ", with a ",
      percentage:
        data?.performanceSummary?.lowestPerformingInvestment?.return + "%",
    },
  ];

  return (
    <>
      <FlatList
        style={{ marginBottom: 30, padding: 12 }}
        data={portfolioDetails}
        keyExtractor={(item, index) => index.toString()} // Unique key for each item
        ListHeaderComponent={() => (
          <>
            <Text style={styles.headerText}>Portfolio Details</Text>
          </>
        )}
        renderItem={({ item, index }) => (
          <View>
            <DetailRow label={item.label} value={item.value} />
            {index < portfolioDetails.length - 1 && (
              <View style={styles.divider} />
            )}
          </View>
        )}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                borderTopColor: Colors.offWhite,
                borderTopWidth: 20,
                marginVertical: 20,
              }}
            />
            <Text style={styles.headerText}>Asset Allocation</Text>

            {/* Asset Allocation FlatList */}
            <FlatList
              data={Object.keys(
                data?.assetAllocation ? data?.assetAllocation : {}
              )}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                const dt = data?.assetAllocation[item];
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
                          source={getCategoryIcon(item)}
                          style={styles.icon}
                        />
                      </View>
                      <Text style={styles.investmentTitle}>{item}</Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.investmentAmount}>
                        {dt.amount ? Number(dt.amount).toFixed(2) : 0}
                      </Text>
                      <Text style={styles.investmentDate}>
                        {" "}
                        ({dt.percentage})
                      </Text>
                    </View>
                  </View>
                );
              }}
              ItemSeparatorComponent={() => <View style={styles.divider} />}
            />
            <View
              style={{
                borderTopColor: Colors.offWhite,
                borderTopWidth: 20,
                marginVertical: 20,
              }}
            />

            {/* Performance Summary FlatList */}
            <Text style={styles.headerText}>Performance Summary</Text>
            <FlatList
              data={performanceSummaryData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.performanceContainer}>
                  <Text style={styles.performanceTitle}>{item.title}</Text>
                  <Text style={styles.performanceDescription}>
                    {item.description}
                    <Text style={styles.performancePercentage}>
                      {item.percentage}
                    </Text>
                  </Text>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={styles.divider} />}
            />
            <View
              style={{
                borderTopColor: Colors.offWhite,
                borderTopWidth: 20,
                marginVertical: 20,
              }}
            />
            <Text style={styles.headerText}>Risk Level</Text>

            {/* Risk Level FlatList */}
            <FlatList
              data={Object.keys(data?.riskLevels ? data?.riskLevels : {})}
              keyExtractor={(item, index) => index.toString()}
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
                          source={getCategoryIcon(item)}
                          style={styles.icon}
                        />
                      </View>
                      <Text style={styles.investmentTitle}>{item}</Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.investmentAmount}>
                        {data?.riskLevels[item]}
                      </Text>
                    </View>
                  </View>
                );
              }}
              ItemSeparatorComponent={() => <View style={styles.divider} />}
            />
          </View>
        )}
      />
    </>
  );
};

export default Overview;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontFamily: "Urbanist-Bold",
    marginBottom: 20,
  },
  divider: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 1,
    marginVertical: 10, // Adds space around the divider
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
    textAlign: "right",
    fontFamily: "Urbanist-Medium",
    fontSize: 12,
  },
  // Styles for Performance Summary
  performanceContainer: {
    marginBottom: 10,
  },
  performanceTitle: {
    fontSize: 16,
    fontFamily: "Urbanist-Bold",
    marginBottom: 5,
  },
  performanceDescription: {
    fontSize: 14,
    fontFamily: "Urbanist-Medium",
  },
  performancePercentage: {
    color: "#31C440", // Green color for percentages
    fontFamily: "Urbanist-Bold",
  },
});

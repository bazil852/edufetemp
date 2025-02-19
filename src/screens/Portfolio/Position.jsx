import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";

import { Colors } from "../../constants/Colors";
import DetailRow from "../../components/DetailRow";
import getCategoryIcon, { backgroundColor } from "../../utils/icons";
import formatCurrency from "../../utils/currency";
import PerformanceChart from "../../components/performanceChart";

const { width } = Dimensions.get("window");

const Position = ({ data }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({ item, index }) => (
    <View style={[styles.card, { width: width * 0.8 }]}>
      <View style={styles.row}>
        <View
          style={[
            styles.iconWrapper,
            {
              backgroundColor: backgroundColor[index % backgroundColor.length],
            },
          ]}
        >
          <Image source={getCategoryIcon(item.name)} style={styles.icon} />
        </View>
        <Text>{item.name}</Text>
      </View>
      <View style={styles.divider} />
      <DetailRow value={item?.totalInvested} label={"Amount Invested"} />
      <DetailRow value={item?.currentValue} label={"Current Value"} />
      <DetailRow value={item?.roi} label={"ROI"} />
      {/* {item.details.map((detail, index) => (
        <React.Fragment key={index}>
          <View style={styles.divider} />
          <DetailRow value={detail.value} label={detail.label} />
        </React.Fragment>
      ))} */}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Current Holdings</Text>
      <FlatList
        data={data?.currentHoldings}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onScroll={(event) => {
          const slide = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveSlide(slide);
        }}
        scrollEventThrottle={16}
      />
      <View style={styles.dotsContainer}>
        {data?.currentHoldings?.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  activeSlide === index ? Colors.primary : Colors.border,
              },
            ]}
          />
        ))}
      </View>
      <Text style={styles.headerText}>Performance Metrics</Text>
      <PerformanceChart />

      <FlatList
        data={Object.keys(data?.assetAllocations || {})}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const dt = data?.assetAllocations[item];
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
                  <Image source={getCategoryIcon(item)} style={styles.icon} />
                </View>
                <Text style={styles.investmentTitle}>{item}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.investmentAmount}>
                  {formatCurrency(dt.amount)}
                </Text>
                <Text style={styles.investmentDate}> ({dt.percentage})</Text>
                <Text style={styles.investmentDate}>
                  {""} ,{dt.riskLevel} Risk
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
    </ScrollView>
  );
};

export default Position;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Urbanist-Bold",
    marginBottom: 20,
  },
  card: {
    borderColor: Colors.border,
    borderWidth: 1,
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 25,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconContainer: {
    backgroundColor: "#34D1A5",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  divider: {
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    marginVertical: 10,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 50,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
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
});

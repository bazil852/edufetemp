import Svg, { Line, Rect, Text as SvgText } from "react-native-svg";

import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "../../constants/Colors";
import getCategoryIcon, { backgroundColor } from "../../utils/icons";
import formatCurrency from "../../utils/currency";
import PortfolioGrowthChart from "../../components/growthChart";

const SectionDivider = () => <View style={styles.sectionDivider} />;

const Graph = ({ title, children }) => (
  <>
    <TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.graphContainer}>{children}</View>
    </TouchableOpacity>
  </>
);

const Breakdown = ({ data }) => {
  console.log("data", data);
  const data0 = [
    { label: "Asset 1", percentage: 100, color: "#FF9F2F" },
    { label: "Asset 2", percentage: 50, color: "#9C6FF8" },
    { label: "Asset 3", percentage: 70, color: "#34D1A5" },
  ];
  const data2 = [
    { label: "Asset 1", percentage: 100 },
    { label: "Asset 2", percentage: 50 },
    { label: "Asset 3", percentage: 70 },
  ];
  const data3 = [
    { label: "Asset 1", percentage: 30 },
    { label: "Asset 2", percentage: 40 },
    { label: "Asset 3", percentage: 50 },
  ];

  const renderInvestmentItem = ({ item, index }) => (
    <View style={styles.investmentContainer}>
      <View style={styles.investmentInfo}>
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
        <View>
          <Text style={styles.investmentTitle}>{item.name}</Text>
          <Text style={styles.investmentDate}>
            {item?.riskLevel} risk, {item?.maxReturn} max return
          </Text>
        </View>
      </View>
      <Text style={styles.investmentAmount}>
        {formatCurrency(item.currentValue)}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={data?.investmentAnalysis}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderInvestmentItem}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListHeaderComponent={
          <Text style={styles.headerText}>Investment Analysis</Text>
        }
        style={styles.investmentList}
      />
      <SectionDivider />
      <PortfolioGrowthChart />
      <SectionDivider />
      <Graph title="Contribution to Portfolio">
        <Svg width="100%" height="200">
          {/* X-axis percentages */}
          {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value, index) => (
            <SvgText
              key={index}
              x={`${value - 7}%`}
              y="190"
              textAnchor="middle"
              fontSize="10"
              fill={Colors.gray}
            >
              {value}%
            </SvgText>
          ))}

          {/* Horizontal Bars */}
          {data0.map((item, index) => {
            const barHeight = 30;
            const barSpacing = 50;
            const y = index * barSpacing; // Calculate bar position
            return (
              <>
                <React.Fragment key={item.label}>
                  {/* Bar */}
                  <Rect
                    x="0"
                    y={y}
                    width={`${item.percentage}%`}
                    height={barHeight}
                    fill={item.color}
                    rx={15}
                    ry={15}
                  />
                </React.Fragment>
              </>
            );
          })}

          {/* X-axis line */}
          <Line
            x1="0"
            y1="160"
            x2="100%"
            y2="160"
            stroke={Colors.gray}
            strokeWidth="1"
          />
        </Svg>
      </Graph>
      <SectionDivider />
      <Graph title="Risk Comparison">
        <Svg width="100%" height="200">
          {/* X-axis labels */}
          {["Low", "Lower", "Medium", "High", "Higher"].map((label, index) => (
            <SvgText
              key={index}
              x={`${(index + 0.5) * 20}%`} // Distribute labels evenly
              y="190"
              textAnchor="middle"
              fontSize="10"
              fill={Colors.gray}
            >
              {label}
            </SvgText>
          ))}

          {/* Horizontal Bars */}
          {data2.map((item, index) => {
            const barHeight = 30;
            const barSpacing = 50;
            const y = index * barSpacing; // Calculate bar position
            return (
              <React.Fragment key={item.label}>
                {/* Bar */}
                <Rect
                  x="0"
                  y={y}
                  width={`${item.percentage}%`}
                  height={barHeight}
                  fill={"#FF9876"}
                  rx={15}
                  ry={15}
                />
                {/* Label */}
                <SvgText
                  x={`${item.percentage - 10}%`}
                  y={y + barHeight / 1.5}
                  textAnchor="middle"
                  fontSize="14"
                  fontFamily="Urbanist-Bold"
                  fill={"#fff"}
                >
                  {item.label}
                </SvgText>
              </React.Fragment>
            );
          })}

          {/* X-axis line */}
          <Line
            x1="0"
            y1="160"
            x2="100%"
            y2="160"
            stroke={Colors.gray}
            strokeWidth="1"
          />
        </Svg>
      </Graph>
      <SectionDivider />
      <Graph title="Returns Comparison">
        <Svg width="100%" height="200">
          {/* X-axis labels */}
          {[0, 12, 15, 18].map((value, index) => (
            <SvgText
              key={index}
              x={`${(index + 0.1) * 30}%`}
              y="190"
              textAnchor="middle"
              fontSize="10"
              fill={Colors.gray}
            >
              {value}%
            </SvgText>
          ))}

          {/* Horizontal Bars */}
          {data3.map((item, index) => {
            const barHeight = 30;
            const barSpacing = 50;
            const y = index * barSpacing; // Calculate bar position
            return (
              <React.Fragment key={item.label}>
                {/* Bar */}
                <Rect
                  x="0"
                  y={y}
                  width={`${item.percentage}%`}
                  height={barHeight}
                  fill={Colors.bgGreen}
                  rx={15}
                  ry={15}
                />
                {/* Label */}
                <SvgText
                  x={`${item.percentage - 10}%`}
                  y={y + barHeight / 1.5}
                  textAnchor="middle"
                  fontSize="14"
                  fontFamily="Urbanist-Bold"
                  fill={"#fff"}
                >
                  {item.label}
                </SvgText>
              </React.Fragment>
            );
          })}

          {/* X-axis line */}
          <Line
            x1="0"
            y1="160"
            x2="100%"
            y2="160"
            stroke={Colors.gray}
            strokeWidth="1"
          />
        </Svg>
      </Graph>
    </ScrollView>
  );
};

export default Breakdown;

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
  investmentList: {
    marginBottom: 30,
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
  investmentDate: {
    fontSize: 12,
    fontFamily: "Urbanist-Medium",
    color: Colors.gray,
  },
  investmentAmount: {
    fontSize: 14,
    fontFamily: "Urbanist-SemiBold",
  },
  divider: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 1,
    marginVertical: 10,
  },
  sectionDivider: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 20,
    marginVertical: 20,
  },
  graphContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  graphPlaceholderText: {
    textAlign: "center",
  },
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Circle, G, Line, Text as SVGText } from "react-native-svg";

const data = [50, 10, 40, 95, 85, 91, 35, 53, 24, 50];

const Tooltip = ({ x, y, index, value }) => (
  <G x={x(index)} y={y(value)} key={"tooltip"}>
    <Circle
      cx={0}
      cy={0}
      r={6}
      stroke={"white"}
      strokeWidth={2}
      fill={"#4CAF50"}
    />
    <SVGText
      x={-20}
      y={-10}
      fontSize={14}
      fontWeight="bold"
      fill="white"
      textAnchor="middle"
    >
      {value}
    </SVGText>
  </G>
);

const StockChart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>L500.00 HNL</Text>
      <Text style={styles.subText}>L100.00 (15.00%) All times total</Text>
      <LineChart
        style={{ height: 200 }}
        data={data}
        svg={{ stroke: "#4CAF50", strokeWidth: 2 }}
        contentInset={{ top: 20, bottom: 20 }}
        curve={shape.curveLinear}
      >
        {/* <Grid /> */}
        {({ x, y, data }) => {
          const index = Math.floor(data.length / 2);
          return <Tooltip x={x} y={y} index={index} value={data[index]} />;
        }}
      </LineChart>
      <View style={styles.tabs}>
        {["Daily", "2M", "4M", "8M", "1Y", "5Y", "All"].map((label) => (
          <Text key={label} style={styles.tab}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 10,
    margin: 10,
  },
  header: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "#4CAF50",
    marginBottom: 10,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  tab: {
    color: "white",
    fontSize: 14,
    paddingHorizontal: 6,
  },
});

export default StockChart;

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StackedAreaChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Circle, G, Line, Text as SVGText } from "react-native-svg";

const PortfolioGrowthChart = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const data = [
    { year: 2019, carRental: 20, realEstate: 10, shops: 5 },
    { year: 2020, carRental: 40, realEstate: 30, shops: 15 },
    { year: 2021, carRental: 80, realEstate: 50, shops: 30 },
    { year: 2022, carRental: 120, realEstate: 90, shops: 50 },
    { year: 2023, carRental: 150, realEstate: 120, shops: 70 },
    { year: 2024, carRental: 200, realEstate: 160, shops: 100 },
  ];

  const colors = [
    "rgba(26, 188, 156, 0.3)",
    "rgba(142, 68, 173, 0.3)",
    "rgba(230, 126, 34, 0.3)",
  ];
  const keys = ["carRental", "realEstate", "shops"];
  const labels = ["Car Rentals", "Real Estate", "Shops"];

  const Tooltip = ({ x, y, index }) => {
    if (index === null) return null;
    return (
      <G x={x(index)} y={y(data[index].carRental)} key={"tooltip"}>
        <Line
          x1={0}
          y1={0}
          x2={0}
          y2={200}
          stroke="gray"
          strokeDasharray={[4, 4]}
        />
        <Circle
          cx={0}
          cy={0}
          r={6}
          stroke={"white"}
          strokeWidth={2}
          fill={"black"}
        />
        <SVGText x={-20} y={-10} fontSize={14} fill="black" textAnchor="middle">
          {data[index].year}
        </SVGText>
      </G>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portfolio Growth</Text>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>2019-2024 ▼</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>All ▼</Text>
        </TouchableOpacity>
      </View>

      <StackedAreaChart
        style={{ height: 200 }}
        data={data}
        keys={keys}
        colors={colors}
        contentInset={{ top: 20, bottom: 20 }}
        curve={shape.curveNatural}
      >
        {({ x, y }) => <Tooltip x={x} y={y} index={selectedIndex} />}
      </StackedAreaChart>

      <View style={styles.legend}>
        {labels.map((label, index) => (
          <View key={label} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: colors[index] }]} />
            <Text style={styles.legendText}>{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
  },
});

export default PortfolioGrowthChart;

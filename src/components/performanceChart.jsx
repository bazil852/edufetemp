import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Circle, G, Line, Text as SVGText } from "react-native-svg";

const PerformanceChart = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const carRentals = [50, 60, 55, 80, 90, 85, 100, 120, 110, 95];
  const realEstate = [40, 42, 45, 50, 55, 65, 70, 75, 80, 85];
  const shops = [30, 35, 32, 40, 50, 45, 55, 60, 62, 70];

  const categories = [
    { data: carRentals, color: "#1abc9c", label: "Car Rentals" },
    { data: realEstate, color: "#8e44ad", label: "Real Estate" },
    { data: shops, color: "#e67e22", label: "Shops" },
  ];

  const Tooltip = ({ x, y, index }) => {
    if (index === null) return null;
    return (
      <G x={x(index)} y={y(categories[0].data[index])} key={"tooltip"}>
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
          {categories[0].data[index]}
        </SVGText>
      </G>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>3 Jul, 2024</Text>
      <View style={styles.chartContainer}>
        <LineChart
          style={{ height: 200 }}
          data={carRentals}
          svg={{ stroke: "#1abc9c", strokeWidth: 2 }}
          contentInset={{ top: 20, bottom: 20 }}
          curve={shape.curveLinear}
        >
          {({ x, y }) => <Tooltip x={x} y={y} index={selectedIndex} />}
        </LineChart>

        <LineChart
          style={StyleSheet.absoluteFill}
          data={realEstate}
          svg={{ stroke: "#8e44ad", strokeWidth: 2 }}
          contentInset={{ top: 20, bottom: 20 }}
          curve={shape.curveLinear}
        />

        <LineChart
          style={StyleSheet.absoluteFill}
          data={shops}
          svg={{ stroke: "#e67e22", strokeWidth: 2 }}
          contentInset={{ top: 20, bottom: 20 }}
          curve={shape.curveLinear}
        />
      </View>

      <View style={styles.tabs}>
        {["Daily", "Weekly", "Monthly", "Yearly", "All"].map((label) => (
          <TouchableOpacity key={label}>
            <Text style={styles.tab}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.legend}>
        {categories.map(({ color, label }) => (
          <View key={label} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: color }]} />
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
    textAlign: "center",
    marginBottom: 10,
  },
  chartContainer: {
    height: 220,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  tab: {
    color: "#333",
    fontSize: 14,
    paddingHorizontal: 6,
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

export default PerformanceChart;

import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

const NotificationItem = ({ item }) => {
  console.log(item);
  return (
    <View style={styles.notificationItem}>
      {item.icon && (
        <View style={styles.iconContainer}>
          <Image source={item.icon} style={styles.icon} />
        </View>
      )}
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationDate}>
            {formatData(item.created_at)}
          </Text>
        </View>
        <Text style={styles.notificationDescription}>{item.body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: "row",
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: Colors.offWhite,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  notificationContent: {
    marginLeft: 12,
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notificationTitle: {
    fontFamily: "Urbanist-Bold",
    fontSize: 16,
  },
  notificationDate: {
    color: Colors.gray,
  },
  notificationDescription: {
    width: 300,
    marginTop: 5,
  },
});

const formatData = (date) => {
  // if today return time else yesterday, else return date
  let dt = new Date(date);

  let day = dt.getDate();
  let month = dt.getMonth() + 1;
  let year = dt.getFullYear();

  let today = new Date();
  let todayDay = today.getDate();
  let todayMonth = today.getMonth() + 1;
  let todayYear = today.getFullYear();

  if (day === todayDay && month === todayMonth && year === todayYear) {
    return dt.toLocaleTimeString();
  } else if (
    day === todayDay - 1 &&
    month === todayMonth &&
    year === todayYear
  ) {
    return "Yesterday";
  } else {
    return dt.toLocaleDateString();
  }
};

export default NotificationItem;

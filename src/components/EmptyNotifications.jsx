import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Images from "../constants/Images";
import { Colors } from "../constants/Colors";

const EmptyNotifications = () => {
  return (
    <View style={styles.noNotificationsContainer}>
      <Image source={Images.bell} style={styles.bellIcon} />
      <Text style={styles.noNotificationsText}>No notifications</Text>
      <Text style={styles.noNotificationsDescription}>
        Your notifications will appear here once you have received them
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noNotificationsContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  bellIcon: {
    width: 250,
    height: 250,
  },
  noNotificationsText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 24,
  },
  noNotificationsDescription: {
    fontFamily: "Urbanist-Medium",
    color: Colors.gray,
    width: 240,
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
  },
});

export default EmptyNotifications;

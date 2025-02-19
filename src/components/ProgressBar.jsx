import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

export const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.progressBarWrapper}>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
        <View
          style={[
            styles.dot,
            { left: `${progress}%`, transform: [{ translateX: -10 }] },
          ]}
        />
      </View>
      <Text style={[styles.progressText]}>{`${progress}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  progressBarContainer: {
    flexDirection: "row", // Align the progress bar and dot horizontally
    flex: 1, // This ensures the progress bar takes the available space
    height: 10,
    backgroundColor: Colors.offWhite,
    borderRadius: 5,
    marginRight: 8, // Add space between the bar and the text
    position: "relative", // Position relative for the dot
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#5AD066",
    borderRadius: 4,
  },
  dot: {
    width: 5, // Width of the dot
    height: 5, // Height of the dot
    borderRadius: 5, // Make it a circle
    backgroundColor: "white", // Color of the dot
    position: "absolute",
    right: 20,
    top: 1.75,
  },
  progressText: {
    fontSize: 12,
    fontFamily: "Urbanist-Medium",
    color: Colors.gray,
  },
});

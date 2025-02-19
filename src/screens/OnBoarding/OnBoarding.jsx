import React, { useState, useRef } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../../constants/Colors";
import Images from "../../constants/Images";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

const { width } = Dimensions.get("window");

const onboardingData = [
  {
    id: "1",
    title: "Grow your money",
    description:
      "Build long-term wealth with smart investing tools and personalized advice. Trusted by millions of people",
    image: Images.ob1,
  },
  {
    id: "2",
    title: "Expert Portfolio Building",
    description:
      "Our customized investing portfolios offer lower fees than most mutual funds, so more of your money is put to work",
    image: Images.ob2, // Ensure this image exists
  },
  {
    id: "3",
    title: "Fast investment returns",
    description:
      "We guarantee a return to investors without any doubt. Within the two months grace period for the funds allocated",
    image: Images.ob3, // Ensure this image exists
  },
];

const OnBoarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const navigation = useNavigation();

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderItem = ({ item }) => (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      {/* Explicitly handle the status bar height */}
      <View style={styles.statusBar} />

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={onboardingData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
          viewabilityConfig={viewConfig}
          onViewableItemsChanged={onViewableItemsChanged} // Track visible items
        />
      </View>
      <View style={styles.indicatorContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, { opacity: currentIndex === index ? 1 : 0.5 }]}
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("Register")}
          title="Register your account"
          style={styles.primaryButton}
          textStyle={styles.primaryButtonText}
        />
        <Button
          onPress={() => navigation.navigate("SignIn")}
          title="Log in"
          style={styles.secondaryButton}
          textStyle={styles.secondaryButtonText}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Ensure ScrollView takes full height
    backgroundColor: Colors.primary,
    justifyContent: "center", // Center content vertically
  },
  statusBar: {
    height: Constants.statusBarHeight, // Explicit status bar height management
  },
  flatListContainer: {
    flex: 1,
  },
  screen: {
    width,
    alignItems: "center",
    marginTop: 30,
  },
  image: {
    width: "100%",
    height: 380,
    marginTop: 30,
    resizeMode: "contain", // Ensure the image is properly sized
  },
  title: {
    fontSize: 32,
    fontFamily: "Urbanist-Bold",
    color: "#fff",
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginHorizontal: 24,
    marginTop: 16,
    fontFamily: "Urbanist-Medium",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    margin: 5,
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 10,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: "#fff",
    height: 46,
  },
  primaryButtonText: {
    color: Colors.primary,
  },
  secondaryButton: {
    borderColor: "#fff",
    height: 46,
  },
  secondaryButtonText: {
    color: "#fff",
  },
});

export default OnBoarding;

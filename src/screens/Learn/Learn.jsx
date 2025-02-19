import { useVideoPlayer, VideoView } from "expo-video";

import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import { StatusBar } from "expo-status-bar";
import Selectable from "../../components/Selectable";
import { Colors } from "../../constants/Colors";
import Icons from "../../constants/Icons";
import Images from "../../constants/Images";
import Ionicons from "react-native-vector-icons/Ionicons";
import Api from "../../api";
import LearnCard from "../../components/LearnCard";

const Learn = () => {
  // const learnInvestments = ["All", "For you", "Investing", "Earnings"];
  const learnInvestments = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "For you",
      value: "forYou",
    },
    {
      label: "Investing",
      value: "investing",
    },
    {
      label: "Earnings",
      value: "earnings",
    },
  ];
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  const videoData = [
    {
      time: "5 mins",
      title: "Get Started with Edufe",
      icon: Icons.trophy,
      backgroundColor: "#b9eae9",
      videoWidth: 96,
      videoHeight: 90,
    },
    {
      time: "4 mins",
      title: "Investing for better future",
      icon: Icons.coins,
      backgroundColor: "#c6eab9",
      videoWidth: 160,
      videoHeight: 80,
    },
    {
      time: "10 mins",
      title: "How investing works",
      icon: Icons.trophy,
      backgroundColor: "#b9cfea",
      videoWidth: 96,
      videoHeight: 90,
    },
  ];

  // const interestingVideos = [
  //   {
  //     time: "5 mins",
  //     title: "How EDUFE invests in different ventures?",
  //     image: Images.thumbnail1,
  //   },
  //   {
  //     time: "6 mins",
  //     title: "How to maximize your returns?",
  //     image: Images.thumbnail2,
  //   },
  //   // Add more video objects as needed
  // ];

  const [interestingVideos, setInterestingVideos] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await Api.getInterestingVideos("");
    // console.log(res);

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    setInterestingVideos(res);
  };

  return (
    <Container>
      <StatusBar backgroundColor="#fff" />
      <ScrollView
        style={{ flex: 1, marginTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Selectable
          items={learnInvestments}
          selectedItem={selectedPeriod}
          setSelectedItem={setSelectedPeriod}
          label="Learn about Investments"
          description="Investment knowledge stored in one place"
          labelStyle={{ fontSize: 24, marginTop: 20 }}
        />
        <Text
          style={{
            marginVertical: 20,
            fontSize: 20,
            fontFamily: "Urbanist-Bold",
          }}
        >
          Videos for you
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {videoData.map((video, index) => (
            <TouchableOpacity
              onPress={() => {
                alert("THIS WILL OPEN VIDEO");
              }}
              key={index}
              style={[
                styles.videoCard,
                { backgroundColor: video.backgroundColor },
              ]}
            >
              <Text style={styles.timeText}>{video.time}</Text>
              <Text
                style={{
                  color: Colors.gray,
                  marginTop: 30,
                  fontSize: 14,
                  fontFamily: "Urbanist-SemiBold",
                }}
              >
                Video
              </Text>
              <Text style={styles.titleText}>{video.title}</Text>
              <Image
                source={video.icon}
                style={[
                  styles.iconStyle,
                  { width: video.videoWidth, height: video.videoHeight },
                ]}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text
          style={{
            marginVertical: 20,
            fontSize: 20,
            fontFamily: "Urbanist-Bold",
          }}
        >
          Interesting Videos
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {interestingVideos.map((video, index) => (
            <LearnCard video={video} key={index} />
          ))}
        </ScrollView>
      </ScrollView>
    </Container>
  );
};

export default Learn;

const styles = StyleSheet.create({
  videoCard: {
    width: 267,
    height: 267,
    borderRadius: 12,
    padding: 24,
    marginRight: 15,
  },
  timeText: {
    fontSize: 12,
    fontFamily: "Urbanist-SemiBold",
  },
  titleText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 18,
    marginTop: 10,
    color: "#000",
  },
  iconStyle: {
    marginTop: 25,
  },
  container: {
    width: 173,
    height: 200,
    position: "relative",
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    padding: 10,
  },
  time: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "white",
    fontSize: 10,
    backgroundColor: "#071F24",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  checkIcon: {
    width: 48,
    height: 48,
    alignSelf: "center",
    justifyContent: "center",
    margin: "auto", // Ensures the check icon is vertically centered
  },
  title: {
    position: "absolute",
    bottom: 15,
    left: 10,
    color: "white",
    fontSize: 14,
    fontFamily: "Urbanist-SemiBold",
  },
});

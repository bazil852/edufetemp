import { useVideoPlayer, VideoView } from "expo-video";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useEvent } from "expo";

const LearnCard = ({ video, index }) => {
  const player = useVideoPlayer(video.s3Url, (player) => {
    player.loop = true;
    player.pause();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.image}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>{video.title}</Text>
      </View>
    </View>
  );
};

export default LearnCard;

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
    backgroundColor: "#D3D3D3",
    borderRadius: 12,
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

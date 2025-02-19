import React, { useCallback, useMemo, useRef } from "react";
import { View, StyleSheet, PanResponder } from "react-native";
import { Colors } from "../constants/Colors";
import debounce from "lodash.debounce";

const ProgressDragger = React.memo(
  ({ totalAmount, selectedAmount, setSelectedAmount }) => {
    const progressBarWidth = useRef(0);

    const progress = useMemo(() => {
      return (selectedAmount / totalAmount) * 100;
    }, [selectedAmount, totalAmount]);

    const handleSetSelectedAmount = useCallback((amount) => {
      setSelectedAmount(amount);
    }, []);

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          const dragX = gestureState.moveX;
          if (dragX >= 0 && dragX <= progressBarWidth.current) {
            const newSelectedAmount = Math.round(
              (dragX / progressBarWidth.current) * totalAmount
            );
            handleSetSelectedAmount(newSelectedAmount);
          }
        },
      })
    ).current;

    return (
      <View>
        <View
          style={styles.progressBarBackground}
          onLayout={(event) => {
            progressBarWidth.current = event.nativeEvent.layout.width;
          }}
          {...panResponder.panHandlers}
        >
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          <View
            style={[
              styles.dragIndicator,
              { left: `${progress}%`, transform: [{ translateX: -10 }] },
            ]}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  progressBarBackground: {
    height: 68,
    width: "100%",
    backgroundColor: Colors.offWhite,
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 10,
    position: "relative",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#A4E78A",
    borderRadius: 20,
  },
  dragIndicator: {
    position: "absolute",
    bottom: 22,
    height: 20,
    width: 3,
    backgroundColor: "white",
    borderRadius: 10,
  },
});

export default ProgressDragger;

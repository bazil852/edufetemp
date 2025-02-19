import React, { forwardRef } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Modalize } from "react-native-modalize";

const BottomSheet = forwardRef(
  (
    { title, subtitle, imageSource, children, description, height, modalStyle },
    ref
  ) => {
    return (
      <Modalize
        ref={ref}
        modalHeight={height} // Adjust the height as needed
        modalStyle={[styles.modal, modalStyle]}
        overlayStyle={styles.overlay}
      >
        <View style={styles.sheetContent}>
          <View>
            {imageSource && (
              <Image source={imageSource} style={styles.faceIdImage} />
            )}
            <Text style={styles.sheetTitle}>{title}</Text>
            {subtitle && <Text style={styles.sheetSubtitle}>{subtitle}</Text>}
            {description && (
              <Text style={styles.sheetDescription}>{description}</Text>
            )}
          </View>
          {children && <View style={styles.additionalContent}>{children}</View>}
        </View>
      </Modalize>
    );
  }
);

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  sheetContent: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  faceIdImage: {
    width: 56,
    height: 56,
  },
  sheetTitle: {
    fontSize: 22,
    fontFamily: "Urbanist-Bold",
    marginTop: 20,
  },
  sheetSubtitle: {
    fontFamily: "Urbanist-Medium",
    fontSize: 14,
    marginTop: 10,
  },
  sheetDescription: {
    fontFamily: "Urbanist-Medium",
    fontSize: 14,
    marginTop: 10,
  },
  additionalContent: {
    marginTop: 10, // Add some spacing before additional content
  },
});

export default BottomSheet;

import React from "react";
import { View, Text, StyleSheet, Modal, Image } from "react-native";
import { Colors } from "../constants/Colors";
import Button from "../components/Button";

const ConfirmationModal = ({ isVisible, photo, onRetake, onConfirm }) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContent}>
        <View style={styles.imageContainer}>
          {photo?.uri && (
            <Image source={{ uri: photo?.uri }} style={styles.croppedPhoto} />
          )}
        </View>
        <View style={styles.confirmationBar}>
          <Text style={styles.confirmationText}>
            Is your photo easy to read?
          </Text>
          <Text style={{ fontSize: 14 }}>
            Please make sure the text is legible and the entire photo of the ID
            is visible properly.
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title={"Retake"}
              style={{
                flex: 1,
                backgroundColor: Colors.offWhite,
                height: 61,
              }}
              onPress={onRetake}
            ></Button>
            <Button
              title={"Yes, looks good"}
              style={{
                flex: 1,
                backgroundColor: Colors.primary,
                height: 61,
              }}
              textStyle={{ color: "white" }}
              onPress={onConfirm}
            ></Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 70,
  },
  croppedPhoto: {
    width: "100%",
    height: 250,
  },
  confirmationBar: {
    height: 230,
    backgroundColor: "#fff",
    padding: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: "100%",
  },
  confirmationText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "auto",
    gap: 5,
  },
});

export default ConfirmationModal;

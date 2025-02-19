import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { Colors } from "../constants/Colors";
import InputField from "./InputField";
import Button from "./Button";
import Api from "../api";
import { useAtom } from "jotai";
import { userPersonalDataAtom } from "../atoms/global";

const CreatePortfolio = ({ visible, onClose, getUserPortfolios }) => {
  console.log("refresh");
  const [userData] = useAtom(userPersonalDataAtom);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const handleAddPortfolio = async () => {
    const res = await Api.createPortfolio(
      {
        name,
        userId: userData?.id,
      },
      setLoading
    );

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    Alert.alert("Success", "Portfolio created successfully");

    getUserPortfolios();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <Text style={styles.dialogTitle}>Create Portfolio</Text>
            <TouchableOpacity
              onPress={onClose}
              style={{
                position: "absolute",
                right: 10,
              }}
            >
              <Icon name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <InputField
            label="Portfolio Name"
            value={name}
            onChangeText={setName}
          />

          <Button
            title="Create Portfolio"
            style={{ backgroundColor: Colors.primary, marginTop: 10 }}
            textStyle={{ color: "#fff" }}
            onPress={handleAddPortfolio}
            loading={loading}
            disabled={loading || !name}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CreatePortfolio;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContent: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "90%",
    maxWidth: 400,
  },
  dialogTitle: {
    fontSize: 22,
    fontFamily: "Urbanist-Bold",
    marginBottom: 10,
  },
  // Existing styles here...
});

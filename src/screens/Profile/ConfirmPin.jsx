import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Switch } from "react-native-paper";
import Loader from "../../components/Loader";
import { Colors } from "../../constants/Colors";
import Button from "../../components/Button";
import Container from "../../components/Container";
import BackNav from "../../components/BackNav";
import BottomSheet from "../../components/BottomSheet";
import Icons from "../../constants/Icons";

const ConfirmPin = ({ buttonAction }) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [isTwoStepVerificationEnabled, setIsTwoStepVerificationEnabled] =
    useState(false);
  const [isAutoLockEnabled, setIsAutoLockEnabled] = useState(false);
  const [isFaceIdEnabled, setIsFaceIdEnabled] = useState(false);

  const inputRefs = useRef([]);
  const bottomSheetRef = useRef(null);

  const handlePinChange = (index, value) => {
    if (value.length <= 1) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Automatically focus on the next input
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      } else if (value && index === inputRefs.current.length - 1) {
        Keyboard.dismiss();
      }
    }
  };

  const isPinComplete = pin.every((digit) => digit !== "");

  const handleConfirm = () => {
    if (isPinComplete) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        buttonAction?.();
        bottomSheetRef.current?.open();
      }, 2000);
    }
  };

  return (
    <Container>
      <BackNav />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Enter your pin to access</Text>
            <Text style={styles.subHeaderText}>
              A security check to keep your account safe
            </Text>
          </View>

          <View style={styles.inputContainer}>
            {pin.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit ? "●" : ""}
                onChangeText={(value) => handlePinChange(index, value)}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
                secureTextEntry
                autoFocus={index === 0}
              />
            ))}
          </View>

          <View style={styles.btnContainer}>
            <Button
              style={{ backgroundColor: Colors.primary }}
              textStyle={{ color: "white" }}
              title="Confirm PIN"
              onPress={handleConfirm}
              disabled={!isPinComplete}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <Loader isLoading={loading} />

      <BottomSheet
        ref={bottomSheetRef}
        title="Security"
        description="Face id , Passcode"
        height={580}
      >
        <View style={{ marginTop: 20 }}>
          {["Change Account Password", "PIN Code"].map((label, index) => (
            <View key={index}>
              <View style={styles.row}>
                <View style={{ gap: 10 }}>
                  <Text style={styles.optionTitle}>{label}</Text>
                  <Text style={styles.optionDescription}>"Password"</Text>
                </View>
                <Image source={Icons.Check} style={styles.checkIcon} />
              </View>
              {index <= 1 && <View style={styles.separator} />}
            </View>
          ))}

          {[
            {
              label: "2-Step Verification",
              value: isTwoStepVerificationEnabled,
              onChange: setIsTwoStepVerificationEnabled,
            },
            {
              label: "Auto-lock (PIN after 10 min)",
              value: isAutoLockEnabled,
              onChange: setIsAutoLockEnabled,
            },
            {
              label: "Face ID",
              value: isFaceIdEnabled,
              onChange: setIsFaceIdEnabled,
            },
          ].map((item, index) => (
            <View key={index}>
              <View style={styles.row}>
                <Text style={styles.switchLabel}>{item.label}</Text>
                <Switch
                  style={{ transform: [{ scale: 1.5 }] }}
                  color={Colors.primary}
                  value={item.value}
                  onValueChange={() => item.onChange(!item.value)}
                />
              </View>
              {index < 2 && <View style={styles.separator} />}
            </View>
          ))}

          <Button
            title="Save Changes"
            onPress={() => bottomSheetRef.current?.close()}
            style={{ backgroundColor: Colors.primary, marginTop: 10 }}
            textStyle={{ color: "#fff" }}
          />
        </View>
      </BottomSheet>
    </Container>
  );
};

export default ConfirmPin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    marginTop: 20,
  },
  headerText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 24,
    marginBottom: 10,
  },
  subHeaderText: {
    color: Colors.gray,
    fontFamily: "Urbanist-Medium",
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
  },
  input: {
    width: "25%",
    height: 67,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 5,
  },
  btnContainer: {
    marginTop: "auto",
    alignItems: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionTitle: {
    fontSize: 14,
    fontFamily: "Urbanist-SemiBold",
  },
  optionDescription: {
    color: Colors.gray,
    fontSize: 12,
    fontFamily: "Urbanist-Medium",
  },
  checkIcon: {
    width: 20,
    height: 20,
  },
  separator: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 2,
    marginVertical: 16,
  },
  switchLabel: {
    fontFamily: "Urbanist-Medium",
    fontSize: 14,
    flex: 1,
  },
});

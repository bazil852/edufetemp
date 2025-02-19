import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";

import Container from "../../components/Container";
import BackNav from "../../components/BackNav";
import VerifyCode from "../../components/VerifyCode";
import BottomSheet from "../../components/BottomSheet";
import Icons from "../../constants/Icons";
import Button from "../../components/Button";
import { Colors } from "../../constants/Colors";

const TransferOTP = ({ route }) => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null); // Create a reference for the bottom sheet
  const { amount } = route.params;

  // Function to open the bottom sheet
  const handleVerify = () => {
    bottomSheetRef.current?.open(); // Open the bottom sheet
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={"#fff"} />
      <BackNav />
      <VerifyCode
        buttonOneTitle="Resend Code"
        buttonTwoTitle="Verify"
        additionalText="Having trouble? Try another way"
        buttonTwoAction={handleVerify} // Set buttonTwoAction to handleVerify
      />
      {/* Include BottomSheet component */}
      <BottomSheet
        ref={bottomSheetRef}
        imageSource={Icons.check}
        title="Funds on the Way"
        subtitle={`Transaction of L${amount}.00 has been scheduled. In a few minutes your account will be credited with exact amount`}
        height={370} // Adjust height as needed
      >
        <View style={{ marginTop: 20, gap: 10 }}>
          <Button
            title={"Track My Transfer"}
            style={{ backgroundColor: Colors.primary }}
            textStyle={{ color: "#fff" }}
          />
          <Button
            title={"Got it"}
            style={{ borderColor: Colors.primary, borderWidth: 1 }}
            textStyle={{ color: Colors.primary }}
            onPress={() => bottomSheetRef.current?.close()} // Close without reinvesting
          />
        </View>
      </BottomSheet>
    </Container>
  );
};

export default TransferOTP;

const styles = StyleSheet.create({});

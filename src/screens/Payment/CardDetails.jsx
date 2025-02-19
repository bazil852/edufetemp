import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import Container from "../../components/Container";
import BackNav from "../../components/BackNav";
import { Colors } from "../../constants/Colors";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import BottomSheet from "../../components/BottomSheet"; // Custom BottomSheet
import Icons from "../../constants/Icons";

const CardDetails = () => {
  const bottomSheetRef = useRef(null);
  const [formData, setFormData] = useState({
    bankName: "",
    cardNumber: "",
    cvv: "",
    address: "",
    city: "",
    postalCode: "",
    amount: "",
    expiryMonth: "",
    expiryYear: "",
    state: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = () => {
    setLoading(true);
    console.log("Form Data:", formData);

    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      bottomSheetRef.current.open(); // Open the custom bottom sheet after loading
    }, 2000);
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={"#fff"} />
      <Loader
        isLoading={loading}
        message="Waiting for a response from your bank. Please wait, we’re gathering your information."
      />
      <BackNav />
      <View style={styles.flexContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.logInText}>Debit Card Details</Text>
          <Text style={styles.welcomeText}>
            Add your card for easy payments
          </Text>
        </View>
      </View>
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* Input Fields */}
        <InputField
          label="Bank Name"
          value={formData.bankName}
          onChangeText={(value) => handleChange("bankName", value)}
        />
        <InputField
          label="Card Number"
          value={formData.cardNumber}
          onChangeText={(value) => handleChange("cardNumber", value)}
          keyboardType="numeric"
        />
        <InputField
          label="CVV"
          value={formData.cvv}
          onChangeText={(value) => handleChange("cvv", value)}
          keyboardType="numeric"
          secureTextEntry={true}
        />
        <View style={styles.expiryContainer}>
          <View style={{ flex: 1 }}>
            <InputField
              label="Expiry Month"
              value={formData.expiryMonth}
              onChangeText={(value) => handleChange("expiryMonth", value)}
              keyboardType="numeric"
              containerStyle={styles.expiryInput}
            />
          </View>
          <View style={{ flex: 1 }}>
            <InputField
              label="Expiry Year"
              value={formData.expiryYear}
              onChangeText={(value) => handleChange("expiryYear", value)}
              keyboardType="numeric"
              containerStyle={styles.expiryInput}
            />
          </View>
        </View>
        <InputField
          label="Address"
          value={formData.address}
          onChangeText={(value) => handleChange("address", value)}
        />
        <InputField
          label="City"
          value={formData.city}
          onChangeText={(value) => handleChange("city", value)}
        />
        <InputField
          label="State/Province"
          value={formData.state}
          onChangeText={(value) => handleChange("state", value)}
        />
        <InputField
          label="Postal Code"
          value={formData.postalCode}
          onChangeText={(value) => handleChange("postalCode", value)}
          keyboardType="numeric"
        />
        <InputField
          label="Amount"
          value={formData.amount}
          onChangeText={(value) => handleChange("amount", value)}
          keyboardType="numeric"
        />
      </ScrollView>

      {/* Submit Button */}
      <Button
        style={{ backgroundColor: Colors.primary }}
        textStyle={{ color: "#fff" }}
        title="Add"
        onPress={handleSubmit}
      />

      {/* Custom Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        imageSource={Icons.check}
        title="Your transfer is being processed"
        subtitle="You have successfully made the transfer of $1.00 into your EDUFE wallet for verification."
        description=" You have also attached your debit card with EDUFE."
        height={350}
      >
        <View style={styles.buttonContainer}>
          <Button
            title="View Account"
            onPress={() => bottomSheetRef.current.close()}
            style={{ backgroundColor: Colors.primary }}
            textStyle={{ color: "#fff" }}
          />
        </View>
      </BottomSheet>
    </Container>
  );
};

export default CardDetails;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 20,
  },
  logInText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 24,
    marginBottom: 10,
  },
  welcomeText: {
    color: Colors.gray,
    fontFamily: "Urbanist-Medium",
    marginBottom: 24,
  },
  expiryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    width: "100%",
  },
  expiryInput: {
    flex: 1,
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: "auto", // Pushes the button to the bottom
  },
});

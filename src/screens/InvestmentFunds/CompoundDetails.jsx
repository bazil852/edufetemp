import AntDesign from "@expo/vector-icons/AntDesign";

import React, { useState, useRef, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";

import RNPickerSelect from "react-native-picker-select";
import { Colors } from "../../constants/Colors";
import Images from "../../constants/Images";
import InputField from "../../components/InputField";
import ProgressDragger from "../../components/ProgressDragger";
import Selectable from "../../components/Selectable";
import BottomSheet from "../../components/BottomSheet";
import Button from "../../components/Button";
import FundItem from "../../components/FundItem";
import { funds } from "../../utils/Index";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Dialog, Portal } from "react-native-paper";
import CreatePortfolio from "../../components/CreatePortfolio";
import { useAtom } from "jotai";
import { portfolioAtom, profileAtom } from "../../atoms/global";
import Api from "../../api";
import formatCurrency from "../../utils/currency";
import { NumericInput } from "../../components/NumericInput";

const timePeriods = [
  {
    label: "1 Year",
    value: 1,
  },
  {
    label: "2 Years",
    value: 2,
  },
  {
    label: "3 Years",
    value: 3,
  },
  {
    label: "4 Years",
    value: 4,
  },
  {
    label: "5 Years",
    value: 5,
  },
];

const CompoundDetails = ({ data, setData, opportunities }) => {
  const navigation = useNavigation();
  const [userPortfolios, setUserPortfolios] = useAtom(portfolioAtom);
  const [userData] = useAtom(profileAtom);

  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const totalAmount = 200; // Total amount in EDUFE wallet
  const [selectedAmount, setSelectedAmount] = useState(10); // Draggable selected amount
  const [selectedFund, setSelectedFund] = useState(null); // State to track selected fund
  const refBottomSheet = useRef(); // Reference for Fund selection BottomSheet

  const [dialogVisible, setDialogVisible] = useState(false);

  const showDialog = () => {
    setDialogVisible(true);
  };
  const hideDialog = () => {
    setDialogVisible(false);
  };

  const openSheet = () => {
    refBottomSheet.current.open();
  };

  const closeSheet = () => {
    refBottomSheet.current.close();
  };

  const handleFundSelection = (id) => {
    setSelectedFund(id);
  };

  const handleProceed = () => {
    closeSheet();
    navigation.navigate("FundsOtp", { selectedAmount });
  };

  const renderFundItem = ({ item }) => (
    <FundItem
      fund={item}
      isSelected={selectedFund === item.id}
      onSelect={() => handleFundSelection(item.id)}
    />
  );

  const handleInvest = async () => {
    const res = await Api.createInvestment(
      {
        ...data,
        amountInvested: data.amountInvested.toString(),
      },
      setLoading
    );

    console.log(res);

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    getUserPortfolios();

    Alert.alert("Success", "Investment created successfully", [
      {
        text: "OK",
        onPress: () => navigation.navigate("TabNavigator"),
      },
    ]);
  };

  const getUserPortfolios = async () => {
    const res = await Api.getUserPortfolios("/" + userData.id);

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    setUserPortfolios(res);
  };

  return (
    <>
      <View>
        <View style={{ marginVertical: 20 }}>
          <Selectable
            items={timePeriods}
            selectedItem={data.timePeriod}
            setSelectedItem={(value) => setData({ ...data, timePeriod: value })}
            label="Time Period"
            description="Choose your investment duration"
          />
        </View>
        <View>
          <Image source={Images.compoundGraph} style={styles.image} />
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Amount</Text>
          <Text style={styles.walletBalance}>
            Your EDUFE wallet has L{totalAmount} HNL
          </Text>

          {/* <ProgressDragger
            totalAmount={totalAmount}
            selectedAmount={data.amountInvested}
            setSelectedAmount={(amount) =>
              setData((prev) => ({ ...prev, amountInvested: amount }))
            }
          />

          <Text style={styles.selectedAmountText}>
            L{data?.amountInvested} HNL
          </Text> */}
          <NumericInput
            value={data?.amountInvested}
            onChange={(text) => {
              setData((prev) => ({ ...prev, amountInvested: text }));
            }}
          />
          {/* <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              value={formatCurrency(
                data?.amountInvested ? data?.amountInvested : 0
              )}
              onChangeText={(text) => {
                // must be a positive number

                setData((prev) => ({ ...prev, amountInvested: text }));
              }}
              keyboardType="numeric"
              placeholderTextColor={Colors.gray}
            />
            <View style={[styles.countdownContainer]}>
              <TouchableOpacity
                onPress={() => {
                  if (data?.amountInvested < 10) {
                    setData((prev) => ({ ...prev, amountInvested: 0 }));
                    return;
                  }

                  setData((prev) => ({
                    ...prev,
                    amountInvested: prev.amountInvested - 10,
                  }));
                }}
              >
                <AntDesign
                  name="minussquare"
                  size={24}
                  color={Colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setData((prev) => ({
                    ...prev,
                    amountInvested: prev.amountInvested + 10,
                  }));
                }}
              >
                <AntDesign name="plussquare" size={24} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View> */}
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View style={{ width: 200 }}>
            <Text style={styles.amountLabel}>Portfolio</Text>
            <Text style={styles.walletBalance}>
              Selected portfolio and category
            </Text>
          </View>
          <Button
            style={styles.addButton}
            onPress={showDialog}
            title={"+ Create New"}
            textStyle={styles.addButtonText}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.dropdownLabel}>Portfolio Name</Text>
          <View style={styles.border}>
            <RNPickerSelect
              onValueChange={(value) => {
                setData((prev) => ({ ...prev, portfolioId: value }));
              }}
              items={userPortfolios.map((portfolio) => ({
                label: portfolio.name,
                value: portfolio.id,
              }))}
              value={data.portfolioId}
              Icon={() => (
                <Icon
                  name="chevron-down"
                  size={18}
                  color="black"
                  style={{
                    top: 16,
                    right: 10,
                  }}
                />
              )}
              useNativeAndroidPickerStyle={false}
              style={pickerStyle}
            />
          </View>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={styles.dropdownLabel}>Portfolio Category</Text>
          <View style={styles.border}>
            <RNPickerSelect
              onValueChange={(value) =>
                setData((prev) => ({ ...prev, investmentOpportunityId: value }))
              }
              items={opportunities.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
              value={data.investmentOpportunityId}
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <Icon
                  name="chevron-down"
                  size={18}
                  color="black"
                  style={{
                    top: 16,
                    right: 10,
                  }}
                />
              )}
              style={pickerStyle}
            />
          </View>
        </View>

        <View style={styles.paraContainer}>
          <Text style={styles.paraText}>
            Edufe will take at least 2 months to process your investment. You
            will start seeing the results after this time on your home screen.
            In the meanwhile, we will show the growth projection of your
            investments.
          </Text>
        </View>
      </View>
      <Button
        style={styles.btnContainer}
        textStyle={{ color: "#fff" }}
        title={`Invest ${data.amountInvested} HNL`}
        onPress={handleInvest}
        loading={loading}
        disabled={loading}
      />
      <BottomSheet ref={refBottomSheet} title="Add Funds From" height={450}>
        <FlatList
          data={funds}
          keyExtractor={(fund) => fund.id.toString()}
          renderItem={renderFundItem}
        />
        <Button
          title={"Proceed"}
          style={{ backgroundColor: Colors.primary }}
          textStyle={{ color: "#fff" }}
          onPress={handleProceed}
        />
      </BottomSheet>
      {dialogVisible && (
        <CreatePortfolio
          visible={dialogVisible}
          onClose={hideDialog}
          getUserPortfolios={getUserPortfolios}
        />
      )}
    </>
  );
};

export default CompoundDetails;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 160,
  },
  amountContainer: {
    marginTop: 10,
  },
  amountLabel: {
    fontFamily: "Urbanist-Bold",
    fontSize: 20,
    marginBottom: 4,
  },
  walletBalance: {
    fontFamily: "Urbanist-Regular",
    fontSize: 14,
    color: Colors.gray,
  },
  selectedAmountText: {
    position: "absolute",
    bottom: "25%",
    left: 16,
    fontFamily: "Urbanist-Medium",
    fontSize: 16,
  },
  paraContainer: {
    marginTop: 30,
    backgroundColor: "#E8F1F4",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  paraText: {
    fontSize: 14,
    fontFamily: "Urbanist-Medium",
    lineHeight: 24,
  },
  btnContainer: {
    backgroundColor: Colors.primary,
    marginBottom: 10,
  },
  addButton: {
    marginLeft: "auto",
    width: 120,
    height: 40,
    backgroundColor: Colors.primary,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Urbanist-Bold",
  },
  border: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    marginTop: 10,
  },
  dialog: {
    padding: 20,
    backgroundColor: "#fff",
  },
  dialogTitle: {
    fontSize: 22,
    fontFamily: "Urbanist-Bold",
    marginBottom: 10,
  },
});
const pickerStyle = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    height: 50,
    paddingHorizontal: 12,
    borderRadius: 8,
    color: Colors.primary,
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    height: 50,
    paddingHorizontal: 12,
    borderRadius: 8,
    color: Colors.primary,
    paddingRight: 30,
  },
});

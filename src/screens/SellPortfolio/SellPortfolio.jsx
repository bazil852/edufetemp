import { StatusBar } from "expo-status-bar";
import { Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";

import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { portfolioAtom, userPersonalDataAtom } from "../../atoms/global";
import BottomSheet from "../../components/BottomSheet";
import Selectable from "../../components/Selectable";
import Container from "../../components/Container";
import DetailRow from "../../components/DetailRow";
import formatCurrency from "../../utils/currency";
import { Colors } from "../../constants/Colors";
import BackNav from "../../components/BackNav";
import Button from "../../components/Button";
import Icons from "../../constants/Icons";
import Api from "../../api";

const SellPortfolio = ({ route }) => {
  const navigation = useNavigation();
  const portfolioId = route?.params?.portfolioId;
  const [userData] = useAtom(userPersonalDataAtom);
  const [userPortfolios, setPortfolios] = useAtom(portfolioAtom);
  const [selectedItem, setSelectedItem] = useState(portfolioId);
  const [overview, setOverview] = useState({});
  const [loading, setLoading] = useState(false);

  const selectedPortfolio = useMemo(() => {
    return userPortfolios.find((item) => item.id === selectedItem);
  }, [userPortfolios, selectedItem]);

  const discounts = [
    {
      label: "No Discount",
      value: 0,
    },
    {
      label: "5%",
      value: 5,
    },
    {
      label: "10%",
      value: 10,
    },
    {
      label: "15%",
      value: 15,
    },
    {
      label: "20%",
      value: 20,
    },
    {
      label: "25%",
      value: 25,
    },
    {
      label: "50%",
      value: 50,
    },
  ];

  const [selectedPeriod, setSelectedPeriod] = useState(0);
  const modalRef = useRef(null); // Change here

  useEffect(() => {
    const getData = async () => {
      const res = await Api.getPortfolioDetailedOverView(selectedItem);

      if (res?.error) {
        Alert.alert("Error", res?.error);
        return;
      }

      console.log(res);

      setOverview(res);
    };

    getData();
  }, [selectedItem]);

  const handleHome = () => {
    setTimeout(() => {
      modalRef.current.close();
      navigation.navigate("TabNavigator");
    }, 100);
  };

  const portfolioDetails = [
    {
      label: "Current Portfolio Value",
      value: formatCurrency(overview?.portfolioDetails?.currentPortfolioValue),
    },
    { label: "Tenure Date", value: overview?.portfolioDetails?.tenureDate },
    {
      label: "Total Tenure",
      value: Number(overview?.portfolioDetails?.totalTenure) + " Years",
    },
    {
      label: "Portfolio Completed",
      value: overview?.portfolioDetails?.portfolioCompleted + "%",
    },
    {
      label: "Total Average Return",
      value: overview?.portfolioDetails?.totalAverageReturn + "%",
    },
    {
      label: "Initial Investment",
      value: formatCurrency(overview?.portfolioDetails?.initialInvestment),
    },
    {
      label: "Current Portfolio Value",
      value: formatCurrency(overview?.portfolioDetails?.totalReturns),
    },
    {
      label: "Price to Sell ",
      value: formatCurrency(
        overview?.portfolioDetails?.currentPortfolioValue -
          overview?.portfolioDetails?.currentPortfolioValue *
            (selectedPeriod / 100)
      ),
    },
  ];

  const handleSell = async (event) => {
    event.persist();
    const res = await Api.sellonMarket(
      userData?.id,
      {
        portfolioId: selectedItem,
        price: parseFloat(selectedPortfolio?.totalValue),
        discount: selectedPeriod,
      },
      setLoading
    );

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    getUserPortfolios();

    modalRef.current.open();
  };

  const getUserPortfolios = async () => {
    const res = await Api.getUserPortfolios("/" + userData.id);

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    setPortfolios(res);
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
      <BackNav />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Selectable
          items={userPortfolios.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          label="Sell Portfolio"
          description="Your portfolio will be listed on the marketplace"
          labelStyle={{ fontSize: 24, marginTop: 20 }}
        />
        <Divider style={{ marginVertical: 30 }} />

        <Selectable
          items={discounts}
          selectedItem={selectedPeriod}
          setSelectedItem={setSelectedPeriod}
          label="Discount Offer"
          description="Choose discount on your portfolio"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Portfolio worth{" "}
            {formatCurrency(overview?.portfolioDetails?.currentPortfolioValue)}
          </Text>
          <Text style={styles.infoText}>
            You will get{" "}
            {formatCurrency(
              overview?.portfolioDetails?.currentPortfolioValue -
                overview?.portfolioDetails?.currentPortfolioValue *
                  (selectedPeriod / 100)
            )}
            of the total value of the portfolio
          </Text>
          {selectedPeriod > 0 && (
            <Text style={styles.infoText}>
              We will offer {selectedPeriod}% discount to the next buyer
            </Text>
          )}
        </View>

        <FlatList
          style={{ marginBottom: 30 }}
          data={portfolioDetails}
          keyExtractor={(item, index) => index.toString()} // Unique key for each item
          ListHeaderComponent={() => (
            <Text style={styles.headerText}>Portfolio Details</Text>
          )}
          renderItem={({ item }) => (
            <DetailRow
              label={item.label}
              value={item.value}
              bold={item.label === "Price to Sell "} // Pass bold prop to customize styles
            />
          )}
          scrollEnabled={false} // Disable FlatList's scroll
          ItemSeparatorComponent={() => <View style={styles.divider} />}
        />
      </ScrollView>
      <Button
        title={"List Portfolio on Marketplace"}
        style={{ backgroundColor: Colors.primary }}
        textStyle={{ color: "#fff" }}
        onPress={handleSell}
        loading={loading}
        disabled={loading}
      />

      <BottomSheet
        height={330}
        ref={modalRef}
        title={"Portfolio Listed on Marketplace"}
        subtitle={
          "You have successfully listed Jon Portfolio on marketplace for L900.00."
        }
        description={
          "You’ll be notified once any buyer purchases your portfolio."
        }
        imageSource={Icons.check}
      >
        <View style={styles.btnRow}>
          <View style={{ flex: 1 }}>
            <Button
              title={"Go to home"}
              style={{ backgroundColor: Colors.offWhite }}
              textStyle={{ color: Colors.primary }}
              onPress={handleHome}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title={"Your Listings"}
              style={{ backgroundColor: Colors.primary }}
              textStyle={{ color: "#fff" }}
              onPress={() => navigation.replace("Listings")}
            />
          </View>
        </View>
      </BottomSheet>
    </Container>
  );
};

export default SellPortfolio;

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: "#E8F1F4",
    padding: 12,
    borderRadius: 10,
    marginTop: 14,
    flexDirection: "column",
    gap: 5,
  },
  infoText: {
    fontFamily: "Urbanist-Regular",
    fontSize: 14,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Urbanist-Bold",
    marginVertical: 20,
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
    fontSize: 24,
    fontFamily: "Urbanist-Bold",
    marginTop: 20,
  },
  sheetSubtitle: {
    fontFamily: "Urbanist-Medium",
    fontSize: 14,
    marginTop: 10,
  },
  btnRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  divider: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 1,
    marginVertical: 10, // Adds space around the divider
  },
});

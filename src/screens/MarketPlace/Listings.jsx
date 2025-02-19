import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Container from "../../components/Container";
import { StatusBar } from "expo-status-bar";
import BackNav from "../../components/BackNav";
import Selectable from "../../components/Selectable";
import { Divider } from "react-native-paper";
import { Colors } from "../../constants/Colors";
import Icons from "../../constants/Icons";
import { useAtom } from "jotai";
import { userPersonalDataAtom } from "../../atoms/global";
import Api from "../../api";
import MarketplaceItem from "../../components/MarketplaceItem";

const Listings = () => {
  // const portfolios = ["Ready to Sell", "Purchased", "Sold"];

  const [userData] = useAtom(userPersonalDataAtom);

  const [portfolios, setPortfolios] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [solds, setSolds] = useState([]);

  const portfoliosOpt = [
    {
      label: "Ready to Sell",
      value: "ready-to-sell",
    },
    {
      label: "Purchased",
      value: "purchased",
    },
    {
      label: "Sold",
      value: "sold",
    },
  ];
  const [selectedPeriod, setSelectedPeriod] = useState("ready-to-sell");

  useEffect(() => {
    if (!userData?.id) return;
    getData();
    getPurchased();
    getSolds();
  }, [userData]);

  const getData = async () => {
    const res = await Api.getOtherUserPortfolios(userData?.id);

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    setPortfolios(res);
  };

  const getSolds = async () => {
    const res = await Api.getSoldListings(userData?.id);

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    setSolds(res);
  };

  const getPurchased = async () => {
    const res = await Api.getPurchasedListings(userData?.id);

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    setPurchases(res);
  };

  const selected = useMemo(() => {
    if (selectedPeriod === "ready-to-sell") return portfolios;
    if (selectedPeriod === "purchased") return purchases;
    if (selectedPeriod === "sold") return solds;

    return [];
  }, [selectedPeriod, portfolios, purchases, solds]);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
      <BackNav />

      {/* Portfolio List */}
      <FlatList
        data={selected}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContainer}
        renderItem={({ item, index }) => (
          <MarketplaceItem Item={item} index={index} />
        )}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontFamily: "Urbanist-Bold" }}>
              No Portfolios Found
            </Text>
          </View>
        }
        ListHeaderComponent={
          <>
            <Selectable
              items={portfoliosOpt}
              selectedItem={selectedPeriod}
              setSelectedItem={setSelectedPeriod}
              label="Your Listing"
              description="Your portfolio will be listed on the marketplace"
              labelStyle={{ fontSize: 24, marginTop: 20 }}
            />
            <Divider style={{ marginVertical: 30 }} />

            <View style={styles.investmentsHeader}>
              <View style={styles.portfolioInfo}>
                <Text style={styles.portfolioTitle}>Portfolios</Text>
                <Text style={styles.portfolioAmount}>
                  {selected?.length > 0 ? selected?.length : "No"} portfolio
                  listed
                </Text>
              </View>
              <View style={styles.filterButton}>
                <Image source={Icons.filter} style={styles.filterIcon} />
              </View>
            </View>
          </>
        }
      />
    </Container>
  );
};

export default Listings;

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: "#E8F1F4",
    padding: 12,
    borderRadius: 10,
    marginTop: 14,
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
  investmentsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  portfolioTitle: {
    fontFamily: "Urbanist-Bold",
    fontSize: 20,
  },
  portfolioAmount: {
    fontFamily: "Urbanist-Medium",
    color: Colors.gray,
  },
  filterButton: {
    backgroundColor: Colors.offWhite,
    height: 32,
    width: 47,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  filterIcon: {
    width: 24,
    height: 24,
  },
});

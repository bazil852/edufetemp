import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Divider } from "react-native-paper";
import BackNav from "../../components/BackNav";
import Container from "../../components/Container";
import Selectable from "../../components/Selectable";
import { Colors } from "../../constants/Colors";
import Icons from "../../constants/Icons";
import Api from "../../api";
import { useAtom } from "jotai";
import { userPersonalDataAtom } from "../../atoms/global";
import MarketplaceItem from "../../components/MarketplaceItem";

const SavedPortfolios = () => {
  const portfolios = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Car Rentals",
      value: "carRentals",
    },
    {
      label: "Shops",
      value: "shops",
    },
    {
      label: "Real Estate",
      value: "realEstate",
    },
  ];

  const [bookmarkedListings, setBookmarkedListings] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("All");
  const [userData] = useAtom(userPersonalDataAtom);

  useEffect(() => {
    const getData = async () => {
      const res = await Api.getBookmarkedListings(userData?.id);

      if (res?.error) {
        Alert.alert("Error", res?.error);
        return;
      }

      console.log(res);

      setBookmarkedListings(res);
    };

    getData();
  }, []);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
      <BackNav />

      <View showsVerticalScrollIndicator={false}>
        <Selectable
          items={portfolios}
          selectedItem={selectedPeriod}
          setSelectedItem={setSelectedPeriod}
          label="Saved Portfolios"
          description="See all of your saved portfolios"
          labelStyle={{ fontSize: 24, marginTop: 20 }}
        />
        <Divider style={{ marginVertical: 30 }} />

        <View style={styles.investmentsHeader}>
          <View style={styles.portfolioInfo}>
            <Text style={styles.portfolioTitle}>Portfolios</Text>
            <Text style={styles.portfolioAmount}>
              {bookmarkedListings?.length > 0
                ? bookmarkedListings?.length
                : "No"}{" "}
              portfolio saved
            </Text>
          </View>
          <View style={styles.filterButton}>
            <Image source={Icons.filter} style={styles.filterIcon} />
          </View>
        </View>

        {/* Portfolio List */}
        <FlatList
          data={bookmarkedListings}
          contentContainerStyle={styles.scrollContainer}
          keyExtractor={(item) => item.id}
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
        />
      </View>
    </Container>
  );
};

export default SavedPortfolios;

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

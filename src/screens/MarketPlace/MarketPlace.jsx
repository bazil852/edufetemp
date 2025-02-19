import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Container from "../../components/Container";
import Selectable from "../../components/Selectable";
import { Colors } from "../../constants/Colors";
import Icons from "../../constants/Icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-paper";
import MarketplaceItem from "../../components/MarketplaceItem";
import { marketplacePortfolios } from "../../utils/Index";
import Api from "../../api";

const MarketPlace = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const portfolios = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Car Rentals",
      value: "car-rentals",
    },
    {
      label: "Shops",
      value: "shops",
    },
    {
      label: "Real Estate",
      value: "real-estate",
    },
  ];

  const [selectedPeriod, setSelectedPeriod] = useState("all");

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );
  // useEffect(() => {
  //   getData();
  // }, []);

  const getData = async () => {
    const res = await Api.getMarketPlaceListings("/active");

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    setData(res);
    // console.log(res);
  };

  const renderMarketplaceItem = ({ item, index }) => (
    <MarketplaceItem Item={item} index={index} />
  );
  return (
    <Container>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.listingContainer}
          onPress={() => navigation.navigate("Listings")}
        >
          <Image source={Icons.listing} style={styles.iconListing} />
          <Text style={styles.listingText}>Your Listing</Text>
        </TouchableOpacity>
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            style={styles.Icon}
            onPress={() => {
              navigation.navigate("SavedPortfolios");
            }}
          >
            <MaterialCommunityIcons
              name="bookmark-outline"
              size={24}
              color="#141414"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.Icon}>
            <MaterialCommunityIcons name="magnify" size={24} color="#141414" />
          </TouchableOpacity>
        </View>
      </View>
      <Selectable
        items={portfolios}
        selectedItem={selectedPeriod}
        setSelectedItem={setSelectedPeriod}
        label="Marketplace"
        description="Discover the best portfolios to buy"
        labelStyle={{ fontSize: 24, marginTop: 20 }}
      />
      <Divider style={{ marginVertical: 30 }} />
      <View style={styles.investmentsHeader}>
        <View style={styles.portfolioInfo}>
          <Text style={styles.portfolioTitle}>All Portfolios</Text>
          <Text style={styles.portfolioAmount}>
            Showing total {data?.length} portfolios
          </Text>
        </View>
        <View style={styles.filterButton}>
          <Image source={Icons.filter} style={styles.filterIcon} />
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMarketplaceItem}
        ItemSeparatorComponent={<Divider style={{ marginVertical: 10 }} />}
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
    </Container>
  );
};

export default MarketPlace;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  listingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.offWhite,
    justifyContent: "center",
    gap: 5,
    width: 122,
    height: 40,
    borderRadius: 20,
  },
  iconListing: {
    width: 20,
    height: 20,
  },
  listingText: {
    fontSize: 12,
    fontFamily: "Urbanist-SemiBold",
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  Icon: {
    backgroundColor: Colors.offWhite,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    width: 40,
    height: 40,
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

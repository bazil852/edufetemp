import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "../../constants/Icons";
import Container from "../../components/Container";
import { Colors } from "../../constants/Colors";
import Images from "../../constants/Images";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { funds, portfolioDetails } from "../../utils/Index";
import DetailRow from "../../components/DetailRow";
import BottomSheet from "../../components/BottomSheet";
import FundItem from "../../components/FundItem";
import moment from "moment";
import formatCurrency from "../../utils/currency";
import Api from "../../api";
import { useAtom } from "jotai";
import { userPersonalDataAtom } from "../../atoms/global";
import { useApp } from "../../contexts/appContext";

const MarketPlaceDetail = ({ route }) => {
  const navigation = useNavigation();
  const [userData] = useAtom(userPersonalDataAtom);
  const { bookmarks, addBookmark, removeBookmark } = useApp();
  const { portfolioDetails } = route.params;

  console.log(portfolioDetails);

  const refBottomSheet = useRef();
  const [selectedFund, setSelectedFund] = useState(null);
  const [isPortfolioSaved, setIsPortfolioSaved] = useState(false);
  const [overview, setOverview] = useState({});

  const portfolioMenu = useMemo(() => {
    return [
      {
        label: "Current Portfolio Value",
        value: formatCurrency(
          overview?.portfolioDetails?.currentPortfolioValue
        ),
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
    ];
  }, [overview]);

  useEffect(() => {
    const getData = async () => {
      const res = await Api.getPortfolioDetailedOverView(
        portfolioDetails?.portfolio?.id
      );

      if (res?.error) {
        Alert.alert("Error", res?.error);
        return;
      }

      console.log(res);

      setOverview(res);
    };

    getData();
  }, [portfolioDetails?.portfolio]);

  const openSheet = () => {
    refBottomSheet.current.open(); // Open the custom BottomSheet
  };

  const handleFundSelection = (id) => {
    setSelectedFund(id); // Set the selected fund's ID
  };

  const closeSheet = () => {
    refBottomSheet.current.close(); // Close the custom BottomSheet
  };

  const handleSavePortfolio = async () => {
    setIsPortfolioSaved(true); // Change button title to "Saved"

    const res = await Api.AddBookmark({
      listingId: portfolioDetails?.id,
      userId: userData?.id,
    });

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    addBookmark(portfolioDetails?.id);

    Alert.alert("Success", "Portfolio has been saved."); // Show alert
  };

  const handleRemovePortfolio = async () => {
    const res = await Api.RemoveBookmark({
      listingId: portfolioDetails?.id,
      userId: userData?.id,
    });

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    removeBookmark(portfolioDetails?.id);

    Alert.alert("Success", "Portfolio has been removed."); // Show alert
  };

  const renderFundItem = ({ item }) => (
    <FundItem
      fund={item}
      isSelected={selectedFund === item.id}
      onSelect={() => handleFundSelection(item.id)} // Select fund on press
    />
  );

  const buyPortfolio = async () => {
    const res = await Api.buyPortfolio({
      buyerId: userData?.id,
      listingId: portfolioDetails?.id,
    });

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    Alert.alert("Success", "Portfolio has been purchased.");
    navigation.goBack();
  };

  return (
    <Container cusStyles={{ padding: 0 }}>
      <ScrollView>
        <View style={styles.scrollViewContent}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.primary}
          />
          <View style={{ paddingTop: Constants.statusBarHeight }} />

          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
              style={styles.iconButton}
            >
              <Image source={Icons.share} style={styles.notificationIcon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Image source={Images.graph} style={styles.graphImage} />
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <Button
              title={"More from Seller"}
              style={styles.primaryButton}
              textStyle={styles.buttonText}
              onPress={() =>
                navigation.navigate("SellerProfileDetail", {
                  userInfo: portfolioDetails?.seller,
                })
              }
            />
            {portfolioDetails?.seller?.id !== userData?.id && (
              <Button
                title={
                  bookmarks?.includes(portfolioDetails?.id)
                    ? "Remove From Saved"
                    : "Save Portfolio"
                }
                style={styles.primaryButton}
                textStyle={styles.buttonText}
                onPress={() =>
                  bookmarks?.includes(portfolioDetails?.id)
                    ? handleRemovePortfolio()
                    : handleSavePortfolio()
                }
              />
            )}
          </View>
        </View>

        <View style={styles.investmentsHeader}>
          <Text style={styles.portfolioTitle}>
            {portfolioDetails?.portfolio?.name}
          </Text>
          {portfolioDetails?.updatedAt && (
            <Text style={styles.portfolioAmount}>
              {moment(portfolioDetails?.updatedAt).endOf("day").fromNow()}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.sellerInfo}
          onPress={() => {
            navigation.navigate("SellerProfileDetail", {
              userInfo: portfolioDetails?.seller,
            });
          }}
        >
          <Image
            source={
              portfolioDetails?.seller?.photo
                ? { uri: portfolioDetails?.seller?.photo }
                : Images.dp
            }
            style={styles.sellerImage}
          />
          <View style={styles.sellerDetails}>
            <Text style={styles.sellerName}>
              {portfolioDetails?.seller?.fullName}
            </Text>
            <Text style={styles.sellerRating}>4.0 (3)</Text>
          </View>
          <Icon
            name="chevron-forward"
            size={24}
            color="#000"
            style={styles.chevronIcon}
          />
        </TouchableOpacity>

        <View style={styles.sectionDivider} />

        <FlatList
          style={styles.flatList}
          scrollEnabled={true}
          data={portfolioMenu}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <Text style={styles.headerText}>Portfolio Details</Text>
          }
          renderItem={({ item, index }) => (
            <View>
              <DetailRow label={item.label} value={item.value} />
              {index < portfolioDetails.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          )}
          ListFooterComponent={<View style={styles.sectionDivider} />}
        />
      </ScrollView>

      <View style={styles.footerRow}>
        <View style={styles.footerInfo}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Urbanist-Medium",
              color: Colors.gray,
            }}
          >
            Portfolio price
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Urbanist-Bold",
            }}
          >
            {formatCurrency(portfolioDetails.price)}
          </Text>
        </View>
        {portfolioDetails?.status === "ACTIVE" && (
          <Button
            title={"Buy"}
            style={styles.buyButton}
            textStyle={styles.buttonText}
            // onPress={openSheet}
            onPress={() => {
              buyPortfolio();
            }}
          />
        )}
      </View>
      <BottomSheet
        ref={refBottomSheet}
        title="Make Payment From"
        subtitle={null}
        description={null}
        imageSource={null}
        height={510} // Set height as needed
      >
        <FlatList
          data={funds}
          keyExtractor={(fund) => fund.id.toString()}
          renderItem={renderFundItem}
        />
        <Button
          title={"Proceed"}
          style={{ backgroundColor: Colors.primary }}
          textStyle={{ color: "#fff" }}
        />
      </BottomSheet>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    backgroundColor: Colors.primary,
    padding: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButton: {
    backgroundColor: "#416E77",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    width: 47,
    height: 47,
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  graphImage: {
    height: 200,
    width: "100%",
    marginTop: 40,
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: "#416E77",
    flex: 1,
    height: 51,
  },
  buttonText: {
    color: "white",
  },
  investmentsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 20,
  },
  portfolioTitle: {
    fontFamily: "Urbanist-Bold",
    fontSize: 20,
  },
  portfolioAmount: {
    fontFamily: "Urbanist-Medium",
    color: Colors.gray,
  },
  sellerInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  sellerImage: {
    width: 56,
    height: 56,
  },
  sellerDetails: {
    width: 250,
    marginLeft: 10,
  },
  sellerName: {
    fontSize: 16,
    fontFamily: "Urbanist-Bold",
  },
  sellerRating: {
    fontSize: 14,
    fontFamily: "Urbanist-SemiBold",
  },
  chevronIcon: {
    marginLeft: "auto",
  },
  sectionDivider: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 20,
    marginVertical: 20,
  },
  flatList: {
    marginBottom: 30,
    padding: 12,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Urbanist-Bold",
    marginBottom: 20,
  },
  divider: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 1,
    marginVertical: 10,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderTopColor: "#D9D9D9",
    borderTopWidth: 1,
    marginBottom: 10,
  },
  footerInfo: {
    width: 150,
  },
  buyButton: {
    backgroundColor: "#31C440",
    width: 125,
    height: 51,
  },
});

export default MarketPlaceDetail;

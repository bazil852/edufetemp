import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { useAtom } from "jotai";

import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import Icons from "../../constants/Icons";
import Container from "../../components/Container";
import { Colors } from "../../constants/Colors";
import Images from "../../constants/Images";
import Button from "../../components/Button";
import InvestmentItem from "../../components/InvestmentItem";
import { useNavigation } from "@react-navigation/native";
import Dropdown from "../../components/Dropdown";
import { portfolioAtom } from "../../atoms/global";
import Api from "../../api";
import formatCurrency from "../../utils/currency";
import BottomSheetContent from "../../components/Dropdown";
import BottomSheet from "../../components/BottomSheet";
import { useRef } from "react";
import PortfolioLineChart from "../../components/LineChart";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [selectedItem, setSelectedItem] = useState(null);
  const [userPortfolios] = useAtom(portfolioAtom);
  const [investments, setInvestments] = useState([]);
  const refDropdownSheet = useRef();

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const renderInvestmentItem = ({ item, index }) => (
    <InvestmentItem investment={item} index={index} />
  );

  useEffect(() => {
    if (userPortfolios?.length === 0) {
      setSelectedItem(null);
      return;
    }

    if (!selectedItem && userPortfolios?.length > 0) {
      setSelectedItem(userPortfolios[0].id);
    }

    const getData = async () => {
      if (!selectedItem) return;
      const res = await Api.getPortfolioInvestmentsDetails(selectedItem);

      if (res?.error) {
        Alert.alert("Error", res?.error);
        return;
      }
      setInvestments(res?.investments);
    };

    getData();
  }, [selectedItem, userPortfolios]);

  const selectedPortfolio = useMemo(() => {
    if (!userPortfolios || userPortfolios?.length === 0) return null;
    if (!selectedItem) return;

    return userPortfolios.find((item) => item.id === selectedItem);
  }, [userPortfolios, selectedItem]);

  if (!userPortfolios || userPortfolios?.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.portfolioAmount}>No Portfolios Found</Text>
        <Button
          title={"Invest Funds In Portfolio"}
          style={[styles.investButton, { width: "80%" }]}
          textStyle={styles.investButtonText}
          onPress={() => navigation.navigate("InvestmentFunds")}
        />
      </View>
    );
  }

  const openSheet = () => refDropdownSheet.current.open();
  const closeSheet = () => refDropdownSheet.current.close();
  return (
    <>
      <Container cusStyles={{ padding: 0 }}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
        <View style={styles.paddingTop} />
        <FlatList
          data={investments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderInvestmentItem}
          // contentContainerStyle={{ paddingHorizontal: 12 }}
          ListHeaderComponent={
            <>
              <View style={styles.scrollViewContent}>
                <View style={styles.header}>
                  <TouchableOpacity style={styles.searchIcon}>
                    <MaterialCommunityIcons
                      name="magnify"
                      size={24}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <View style={styles.rightHeader}>
                    <Button
                      title={
                        selectedPortfolio
                          ? selectedPortfolio.name
                          : "Select Portfolio "
                      }
                      style={{
                        width: "auto",
                        height: 47,
                        paddingHorizontal: 20,
                        backgroundColor: "#416E77",
                      }}
                      textStyle={{ color: "#fff" }}
                      onPress={openSheet}
                      icon={
                        <MaterialCommunityIcons
                          name="chevron-down"
                          size={20}
                          color="#fff"
                        />
                      }
                    />
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Notifications")}
                      style={styles.notificationButton}
                    >
                      <Image
                        source={Icons.notification}
                        style={styles.notificationIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <PortfolioLineChart />

                <Button
                  title={"Invest Funds In Portfolio"}
                  style={styles.investButton}
                  textStyle={styles.investButtonText}
                  onPress={() => navigation.navigate("InvestmentFunds")}
                />
              </View>

              <View style={styles.investmentsHeader}>
                <View style={styles.portfolioInfo}>
                  <Text style={styles.portfolioTitle}>
                    Portfolio Investments
                  </Text>
                  <Text style={styles.portfolioAmount}>
                    {formatCurrency(selectedPortfolio?.totalValue)}
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    {
                      opacity: investments?.length === 0 ? 0.5 : 1,
                    },
                  ]}
                  onPress={() =>
                    navigation.navigate("GraphDetails", {
                      portfolio: selectedPortfolio,
                    })
                  }
                  disabled={investments?.length === 0}
                >
                  <Entypo name="eye" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </>
          }
        />

        <BottomSheet
          ref={refDropdownSheet}
          title="Select Portfolio"
          height={400}
        >
          <BottomSheetContent
            portfolios={userPortfolios}
            selectedItem={selectedItem}
            onSelect={handleSelectItem}
            closeSheet={closeSheet}
          />
        </BottomSheet>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    backgroundColor: Colors.primary,
    padding: 12,
  },
  paddingTop: {
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchIcon: {
    backgroundColor: "#416E77",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    width: 47,
    height: 47,
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  notificationButton: {
    backgroundColor: "#416E77",
    height: 47,
    width: 47,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
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
  investButton: {
    backgroundColor: "#31C440",
  },
  investButtonText: {
    color: "white",
  },
  investmentsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  portfolioInfo: {
    marginVertical: 12,
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

export default HomeScreen;

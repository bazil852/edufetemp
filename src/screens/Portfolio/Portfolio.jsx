import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import TabContainer from "../../components/TabContainer";
import { portfolioAtom } from "../../atoms/global";
import Container from "../../components/Container";
import Dropdown from "../../components/Dropdown";
import { Colors } from "../../constants/Colors";
import Button from "../../components/Button";
import Images from "../../constants/Images";
import Icons from "../../constants/Icons";
import Breakdown from "./Breakdown";
import Overview from "./Overview";
import Position from "./Position";
import Payouts from "./Payouts";
import Api from "../../api";
import Stats from "./Stats";
import PortfolioLineChart from "../../components/LineChart";

const GraphDetails = ({ route }) => {
  // const portfolioDetails = route.params.portfolio;

  const navigation = useNavigation();
  const [userPortfolios] = useAtom(portfolioAtom);
  const [activeTab, setActiveTab] = useState("Overview"); // State for the active tab
  const [portfolioDetails, setPortfolioDetails] = useState(
    route?.params?.portfolio
  );
  const [selectedItem, setSelectedItem] = useState(portfolioDetails?.id);

  const [overview, setOverview] = useState({});
  const [stats, setStats] = useState({});
  const [position, setPosition] = useState({});
  const [breakdown, setBreakdown] = useState({});

  const tabs = ["Overview", "Stats", "Position", "Breakdown", "Payouts"]; // Tab names

  useEffect(() => {
    if (!selectedItem) return;
    if (activeTab !== "Overview") return;
    if (Object.keys(overview).length > 0) return;

    const getData = async () => {
      const res = await Api.getPortfolioDetailedOverView(selectedItem);

      if (res?.error) {
        Alert.alert("Error", res?.error);
        return;
      }

      setOverview(res);
    };

    getData();
  }, [selectedItem, activeTab]);

  useEffect(() => {
    if (!selectedItem) return;
    if (activeTab !== "Stats") return;
    if (Object.keys(stats).length > 0) return;

    const getData = async () => {
      const res = await Api.getPortfolioStats(selectedItem);

      console.log(res);

      if (res?.error) {
        Alert.alert("Error", res?.error);
        return;
      }

      setStats(res);
    };

    getData();
  }, [selectedItem, activeTab]);

  useEffect(() => {
    if (!selectedItem) return;
    if (activeTab !== "Position") return;
    if (Object.keys(position).length > 0) return;

    const getData = async () => {
      const res = await Api.getPortfolioPositions(selectedItem);

      if (res?.error) {
        Alert.alert("Error", res?.error);
        return;
      }

      setPosition(res);
    };

    getData();
  }, [selectedItem, activeTab]);

  useEffect(() => {
    if (!selectedItem) return;
    if (activeTab !== "Breakdown") return;
    if (Object.keys(breakdown).length > 0) return;

    const getData = async () => {
      const res = await Api.getPortfolioBreakDown(selectedItem);

      if (res?.error) {
        Alert.alert("Error", res?.error);
        return;
      }

      setBreakdown(res);
    };

    getData();
  }, [selectedItem, activeTab]);

  useEffect(() => {
    getData();
  }, [selectedItem]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setActiveTab("Overview");
    setOverview({});
    setStats({});
    setPosition({});
    setBreakdown({});
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleRemoveFromSelling = async () => {
    const res = await Api.removeFromMarket(selectedItem);

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    getData();

    Alert.alert("Success", "Portfolio has been removed from market.");
  };

  const getData = async () => {
    if (!selectedItem) return;

    const res = await Api.getPortfolioInvestmentsDetails(selectedItem);

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    setPortfolioDetails(res);
  };

  return (
    <>
      <Container cusStyles={{ padding: 0 }}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
        <View style={styles.paddingTop} />
        <ScrollView>
          <View style={styles.scrollViewContent}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.searchIcon}
                onPress={() => navigation.goBack()}
              >
                <Image source={Icons.cross} style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
              <View style={styles.rightHeader}>
                <Dropdown
                  dropdownHeading={"Investments"}
                  items={userPortfolios}
                  selectedItem={selectedItem}
                  onSelect={handleSelectItem}
                />
                <TouchableOpacity style={styles.shareBtn}>
                  <Image source={Icons.share} style={styles.shareIcon} />
                </TouchableOpacity>
              </View>
            </View>

            <PortfolioLineChart />

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                gap: 10,
              }}
            >
              {!portfolioDetails?.isListedOnMarketplace && (
                <Button
                  title={"Sell portfolio"}
                  style={{ backgroundColor: "#416E77", flex: 1, height: 51 }}
                  textStyle={styles.investButtonText}
                  onPress={() =>
                    navigation.navigate("SellPortfolio", {
                      portfolioId: selectedItem,
                    })
                  }
                />
              )}
              {portfolioDetails?.isListedOnMarketplace && (
                <Button
                  title={"Remove from market"}
                  style={{ backgroundColor: "#416E77", flex: 1, height: 51 }}
                  textStyle={styles.investButtonText}
                  onPress={handleRemoveFromSelling}
                />
              )}
              <Button
                title={"Withdraw funds"}
                style={{ backgroundColor: "#416E77", flex: 1, height: 51 }}
                textStyle={styles.investButtonText}
                onPress={() => navigation.navigate("WithdrawFunds")}
              />
            </View>
          </View>

          <View style={{ padding: 10 }}>
            {/* TabContainer */}
            <TabContainer
              activeTab={activeTab}
              onTabClick={handleTabClick}
              tabs={tabs}
            />
          </View>
          {activeTab === "Overview" && <Overview data={overview} />}
          {activeTab === "Stats" && <Stats data={stats} />}
          {activeTab === "Position" && <Position data={position} />}
          {activeTab === "Breakdown" && <Breakdown data={breakdown} />}
          {activeTab === "Payouts" && <Payouts />}
        </ScrollView>
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
  shareBtn: {
    backgroundColor: "#416E77",
    height: 47,
    width: 47,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  shareIcon: {
    width: 24,
    height: 24,
  },
  graphImage: {
    height: 200,
    width: "100%",
    marginTop: 40,
  },
  investButtonText: {
    color: "white",
  },
});

export default GraphDetails;

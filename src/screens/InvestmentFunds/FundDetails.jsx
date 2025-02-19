import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { Colors } from "../../constants/Colors";
import Container from "../../components/Container";
import { StatusBar } from "expo-status-bar";
import BackNav from "../../components/BackNav";
import Icons from "../../constants/Icons";
import TabContainer from "../../components/TabContainer";
import CompoundDetails from "./CompoundDetails";
import Button from "../../components/Button";
import BottomSheet from "../../components/BottomSheet"; // Import your custom BottomSheet
import { funds } from "../../utils/Index";
import { useNavigation } from "@react-navigation/native";
import FundItem from "../../components/FundItem"; // Import the FundItem component
import Api from "../../api";

const FundDetails = ({ route }) => {
  console.log("parent");

  const investment = route?.params?.investment;
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Compound");
  const tabs = ["Simple", "Compound"];

  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    interestType: "Compound",
    amountInvested: 20,
    portfolioId: "",
    investmentOpportunityId: investment?.id || "",
    timePeriod: 0,
  });

  useEffect(() => {
    const getData = async () => {
      const res = await Api.getInvestmentOpportunities("");

      if (res?.error) {
        Alert.alert("Error", res?.error);
        return;
      }

      setOpportunities(res);
    };

    getData();
  }, []);

  const handleInvest = (opportunity) => {
    navigation.navigate("Investment", { opportunity });
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={"#fff"} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <BackNav />
        <View style={styles.headerContainer}>
          <Text style={styles.investText}>Invest Funds</Text>
          <Text style={styles.investDesc}>
            Choose the category of your investment
          </Text>
        </View>
        <View
          style={{ borderTopColor: Colors.offWhite, borderTopWidth: 2 }}
        ></View>
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text style={styles.investText}>Interest Type</Text>
            <Image
              source={Icons.info}
              style={{ width: 24, height: 24, marginBottom: 5 }}
            />
          </View>
          <Text style={styles.investDesc}>
            Interest rate for your investments
          </Text>
        </View>
        <TabContainer
          activeTab={data.interestType}
          onTabClick={(tabName) => {
            setData({ ...data, interestType: tabName });
          }}
          tabs={tabs}
        />
        {/* {data.interestType === "Simple" && <Text>Simple</Text>}
        {data.interestType === "Compound" && (
        )} */}
        <CompoundDetails
          data={data}
          setData={setData}
          opportunities={opportunities}
        />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 24,
  },
  investText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 24,
    marginBottom: 10,
  },
  investDesc: {
    color: Colors.gray,
    fontFamily: "Urbanist-Medium",
    fontSize: 14,
  },
});

export default FundDetails;

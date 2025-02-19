import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Container from "../../components/Container";
import BackNav from "../../components/BackNav";
import { Colors } from "../../constants/Colors";
import Icons from "../../constants/Icons";
import Images from "../../constants/Images";
import TabContainer from "../../components/TabContainer";
import { ProgressBar } from "../../components/ProgressBar";
import { Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { profileAtom, userPersonalDataAtom } from "../../atoms/global";
import { useAtom } from "jotai";
import Api from "../../api";
import MarketplaceItem from "../../components/MarketplaceItem";

const SellerProfileDetail = ({ route }) => {
  const navigation = useNavigation();
  // const [userInfo] = useAtom(profileAtom);

  const [userInfo, setUserData] = useState(route?.params?.userInfo);
  const [portfolios, setPortfolios] = useState([]);

  const tabs = ["About", "Portfolios", "Reviews"];
  const [activeTab, setActiveTab] = useState("About");

  const portfolioData = [
    {
      id: 1,
      title: "Jon Portfolio",
      amount: "L900.00",
      bonus: "10% Bonus",
      time: "By 12 Oct 2024 - 5 years",
      avgReturn: "15%",
      timeAgo: "1 day ago",
      progress: 100,
    },
    {
      id: 2,
      title: "Jon Portfolio",
      amount: "L900.00",
      bonus: "10% Bonus",
      time: "By 12 Oct 2024 - 5 years",
      avgReturn: "15%",
      timeAgo: "1 day ago",
      progress: 10,
    },
    // Add more portfolio objects here
  ];

  const reviewData = [
    {
      id: 1,
      userName: "John Doe",
      rating: 4.5,
      daysAgo: "2 days ago",
      comment:
        "This is an amazing product! The quality exceeded my expectations.",
      userImage: Images.dp, // Replace with your user image path
    },
    {
      id: 2,
      userName: "Jane Smith",
      rating: 4.0,
      daysAgo: "1 week ago",
      comment: "Great experience overall. Would highly recommend!",
      userImage: Images.dp, // Replace with your user image path
    },
    // Add more review objects here
  ];

  useEffect(() => {
    if (!route?.params?.userInfo?.id) return;
    getData();
  }, [route?.params?.userInfo]);

  const getData = async () => {
    const res = await Api.getOtherUserPortfolios(route?.params?.userInfo?.id);

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    setPortfolios(res);
  };

  return (
    <Container>
      {/* Header */}
      <View style={styles.header}>
        <BackNav />
      </View>

      {/* Profile Information */}
      <View style={styles.profileInfoContainer}>
        <Image
          source={userInfo.photo ? { uri: userInfo?.photo } : Images.dp}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{userInfo.fullName}</Text>
        <Text style={styles.email}>
          Member since {formatDate(userInfo.createdAt)}
        </Text>
        <View style={styles.phoneContainer}>
          <Image source={Icons.Star} style={styles.flag} />
          <Text style={styles.phone}>4.0 (5)</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TabContainer
          activeTab={activeTab}
          onTabClick={setActiveTab}
          tabs={tabs}
        />

        {/* Content for each tab */}
        {activeTab === "About" && (
          <View style={styles.aboutContainer}>
            <Text style={styles.sectionTitle}>Bio</Text>
            <Text style={styles.sectionText}>
              {userInfo?.bio ? userInfo?.bio : "No bio provided"}
            </Text>

            <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
              Confirmed Information
            </Text>
            {INFORMATION.map((item, index) => (
              <View key={index} style={styles.confirmedInfoItem}>
                <Image source={Icons.checkGreen} style={styles.icon} />
                <Text>{item.title}</Text>
              </View>
            ))}
          </View>
        )}
        {activeTab === "Portfolios" && (
          <View style={{ paddingHorizontal: 0 }}>
            <View style={styles.investmentsHeader}>
              <View style={styles.portfolioInfo}>
                <Text style={styles.portfolioTitle}>Portfolios</Text>
                <Text style={styles.portfolioAmount}>
                  {portfolioData.length} portfolio
                  {portfolioData.length > 1 ? "s" : ""} for sale
                </Text>
              </View>
              <View style={styles.filterButton}>
                <Image source={Icons.filter} style={styles.filterIcon} />
              </View>
            </View>

            {/* Portfolio List */}
            <FlatList
              data={portfolios}
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

            {/* Portfolio Summary */}
          </View>
        )}
        {activeTab === "Reviews" && (
          <View style={{ paddingHorizontal: 10 }}>
            <View style={styles.investmentsHeader}>
              <View style={styles.portfolioInfo}>
                <Text style={styles.portfolioTitle}>Rating</Text>
                <Text style={styles.portfolioAmount}>
                  Showing total {reviewData.length} review
                  {reviewData.length > 1 ? "s" : ""}
                </Text>
              </View>
            </View>

            {/* Review List */}
            <FlatList
              data={reviewData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.reviewContainer}>
                  {/* User Information */}
                  <View style={styles.userInfo}>
                    <Image
                      source={item.userImage}
                      style={styles.profileImage}
                    />
                    <View style={styles.nameAndRating}>
                      <Text style={styles.userName}>{item.userName}</Text>
                      <Text style={styles.rating}>⭐ {item.rating}</Text>
                    </View>
                    <Text style={styles.daysAgo}>{item.daysAgo}</Text>
                  </View>

                  {/* Review Details */}
                  <View style={styles.reviewDetails}>
                    <Text style={styles.comment}>{item.comment}</Text>
                  </View>
                </View>
              )}
              ItemSeparatorComponent={<Divider />}
              ListEmptyComponent={
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 18, fontFamily: "Urbanist-Bold" }}>
                    No Reviews Found
                  </Text>
                </View>
              }
            />
          </View>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  // Styles remain unchanged
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editProfileButton: {
    width: 117,
    height: 40,
    backgroundColor: Colors.offWhite,
    borderRadius: 30,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfoContainer: {
    alignItems: "center",
    gap: 5,
  },
  icon: { width: 28, height: 28 },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  name: {
    fontSize: 24,
    fontFamily: "Urbanist-Bold",
    textAlign: "center",
  },
  email: {
    fontSize: 14,
    fontFamily: "Urbanist-Medium",
    color: Colors.gray,
    textAlign: "center",
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  flag: {
    width: 24,
    height: 16,
  },
  phone: {
    fontSize: 14,
    fontFamily: "Urbanist-Medium",
    color: Colors.gray,
  },
  tabsContainer: {
    marginTop: 30,
  },
  aboutContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Urbanist-Bold",
  },
  sectionText: {
    fontSize: 14,
    fontFamily: "Urbanist-Medium",
    lineHeight: 22,
    marginTop: 10,
  },
  confirmedInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  investmentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  investmentInfo: {
    flexDirection: "row",
  },
  investmentDetails: {
    flexDirection: "column",
    width: "70%",
  },
  investmentTitle: {
    fontSize: 16,
    fontFamily: "Urbanist-Bold",
  },
  investmentMaturity: {
    fontFamily: "Urbanist-Medium",
    color: Colors.gray,
    marginTop: 4,
  },
  investmentAmount: {
    alignItems: "flex-end",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 14,
    color: "#31C440",
  },
  investmentDate: {
    textAlign: "right",
    fontFamily: "Urbanist-Bold",
    fontSize: 16,
    marginTop: 7,
  },
  investmentsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  reviewContainer: {
    marginVertical: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  nameAndRating: {
    flexDirection: "column",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 14,
    color: "#FFD700", // Gold color for rating
  },
  reviewDetails: {
    marginTop: 10,
  },
  daysAgo: {
    fontSize: 12,
    ontFamily: "Urbanist-Medium",
    marginBottom: 5,
    marginLeft: "auto",
  },
  comment: {
    fontSize: 14,
    fontFamily: "Urbanist-Medium",
  },
});

const INFORMATION = [
  {
    id: 1,
    title: "Identity",
    value: "identity",
  },
  {
    id: 2,
    title: "Email Address",
    value: "email",
  },
  {
    id: 3,
    title: "Phone Number",
    value: "phone",
  },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export default SellerProfileDetail;

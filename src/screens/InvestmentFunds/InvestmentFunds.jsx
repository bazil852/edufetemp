import {
  ActivityIndicator,
  Alert,
  FlatList, // Import FlatList
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Container from "../../components/Container";
import { StatusBar } from "expo-status-bar";
import BackNav from "../../components/BackNav";
import { investmentData } from "../../utils/Index";
import InvestmentCard from "../../components/InvestmentCard"; // Import InvestmentCard
import { Colors } from "../../constants/Colors";
import Api from "../../api";
const InvestmentFunds = () => {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await Api.getInvestmentOpportunities("", setLoading);

      if (res?.error) {
        Alert.alert("Error", res?.error);
        return;
      }

      setData(res);
    };

    getData();
  }, []);

  // Render Item function
  const renderItem = ({ item: investment, index }) => (
    <InvestmentCard
      investment={investment}
      onPress={() => navigation.navigate("FundDetails", { investment })}
      index={index}
    />
  );
  const EmptyList = () => (
    <View style={styles.emptyListContainer}>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <Text style={styles.emptyListText}>No investment funds available.</Text>
      )}
    </View>
  );

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={"#fff"} />
      <BackNav />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={EmptyList}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default InvestmentFunds;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  emptyListContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyListText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 18,
    color: Colors.primary,
  },
});

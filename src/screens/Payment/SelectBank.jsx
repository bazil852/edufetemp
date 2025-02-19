import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Searchbar } from "react-native-paper";
import Container from "../../components/Container";
import BackNav from "../../components/BackNav";
import { Colors } from "../../constants/Colors";
import { banks } from "../../utils/Index";
import Icons from "../../constants/Icons"; // Ensure you have a check icon
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../components/Loader"; // Import your custom loader

const SelectBank = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBanks, setFilteredBanks] = useState(banks); // Initialize with full list
  const [selectedBankId, setSelectedBankId] = useState(null); // Track selected bank
  const [loading, setLoading] = useState(false); // Loading state

  // Function to filter banks based on search query
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredBanks(banks); // Show all banks if search query is empty
    } else {
      const filteredData = banks.filter((bank) =>
        bank.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBanks(filteredData);
    }
  };

  // Function to handle the next button press
  const handleNext = () => {
    if (selectedBankId) {
      setLoading(true); // Set loading to true
      // Simulate an API call
      setTimeout(() => {
        setLoading(false); // Hide loader after the simulated delay
        navigation.navigate("CardDetails"); // Navigate to CardDetails
      }, 2000); // Adjust the delay as needed
    } else {
      alert("Please select a bank."); // Alert if no bank is selected
    }
  };

  // Render each bank item
  const renderBankItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        selectedBankId === item.id && styles.selectedCard,
      ]}
      onPress={() => setSelectedBankId(item.id)} // Handle selection
    >
      <Image source={item.image} style={styles.bankImage} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      {selectedBankId === item.id && (
        <Image source={Icons.checkGreen} style={styles.checkIcon} />
      )}
    </TouchableOpacity>
  );

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={"#fff"} />
      <BackNav />
      <View style={styles.flexContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.logInText}>Select your bank</Text>
          <Text style={styles.welcomeText}>
            Pick your bank to proceed with payments
          </Text>
        </View>

        <Searchbar
          placeholder="Search bank"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />

        <View style={styles.bankList}>
          <Text style={styles.popularText}>Popular banks</Text>
          <FlatList
            data={filteredBanks}
            keyExtractor={(item) => item.id}
            renderItem={renderBankItem}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        </View>

        <Button
          title={"Next"}
          style={{ backgroundColor: Colors.primary }}
          textStyle={{ color: "#fff" }}
          onPress={handleNext} // Use the new handleNext function
        />
      </View>

      <Loader isLoading={loading} />
    </Container>
  );
};

export default SelectBank;

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 20,
  },
  logInText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 24,
    marginBottom: 10,
  },
  welcomeText: {
    color: Colors.gray,
    fontFamily: "Urbanist-Medium",
    marginBottom: 24,
  },
  searchbar: {
    marginBottom: 20,
    backgroundColor: Colors.offWhite,
  },
  bankList: {
    flex: 1,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    padding: 16,
    borderColor: Colors.offWhite,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  selectedCard: {
    borderColor: "black", // Change border color when selected
  },
  bankImage: {
    width: 40,
    height: 40,
    marginRight: 16,
    borderRadius: 25,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "Urbanist-Bold",
  },
  popularText: {
    fontSize: 20,
    fontFamily: "Urbanist-Bold",
    marginBottom: 20,
  },
  checkIcon: {
    width: 28,
    height: 28,
    position: "absolute",
    right: 16, // Adjust as needed
    top: "50%",
  },
});

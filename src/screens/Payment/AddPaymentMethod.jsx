import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Container from "../../components/Container";
import BackNav from "../../components/BackNav";
import { Colors } from "../../constants/Colors";
import Icons from "../../constants/Icons";
import { useNavigation } from "@react-navigation/native";

const AddPaymentMethod = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={"#fff"} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <BackNav />
        <View style={styles.flexContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.logInText}>Add a payment method</Text>
            <Text style={styles.welcomeText}>
              Choose credit/debit card for payment method
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("SelectBank")}>
            <View style={styles.cardContainer}>
              <View style={styles.row}>
                <Image source={Icons.CreditCard} style={styles.icon} />
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>
                    Add new Credit/Debit card
                  </Text>
                  <Text style={styles.cardSubtitle}>
                    Visa or Mastercard required
                  </Text>

                  <View style={styles.recommendedContainer}>
                    <Text style={styles.recommendedText}>Recommended</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};

export default AddPaymentMethod;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
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
  row: {
    flexDirection: "row",
    gap: 16,
  },
  textContainer: {
    gap: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "Urbanist-Bold",
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: "Urbanist-Medium",
    color: Colors.gray,
  },
  recommendedContainer: {
    backgroundColor: "#eaf9ec",
    width: 120,
    borderRadius: 20,
  },
  recommendedText: {
    color: "#31c440",
    padding: 5,
    marginLeft: 5,
  },
  cardContainer: {
    height: 140,
    width: "100%",
    borderColor: Colors.offWhite,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 20,
  },
  icon: {
    width: 28,
    height: 28,
  },
});

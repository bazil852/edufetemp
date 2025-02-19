import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Container from "../../components/Container";
import BackNav from "../../components/BackNav";
import { Colors } from "../../constants/Colors";
import Icons from "../../constants/Icons";
import Selectable from "../../components/Selectable";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Button from "../../components/Button";

const PaymentMethod = () => {
  const methods = ["All", "Bank", "Debit", "Credit"];
  const [selectedMethod, setSelectedMethod] = useState("All");
  const navigation = useNavigation();

  const paymentMethods = [
    {
      id: 1,
      name: "Jonathon",
      desc: "Description",
      icon: Icons.bank,
    },
    {
      id: 2,
      name: "Jon Personal",
      desc: "Description",
      icon: Icons.CreditCard,
    },
    {
      id: 3,
      name: "John Credit",
      desc: "Description",
      icon: Icons.CreditCard,
    },
  ];

  const handleItemSelect = () => {
    navigation.navigate("EditBankAccount");
  };

  const renderPaymentItem = ({ item }) => (
    <TouchableOpacity style={styles.portfolioItem} onPress={handleItemSelect}>
      <View style={styles.iconWrapper}>
        <Image source={item.icon} style={styles.icon} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.portfolioText}>{item.name}</Text>
        <Text
          style={[styles.portfolioText, { color: Colors.gray, fontSize: 14 }]}
        >
          {item.desc}
        </Text>
      </View>
      <Image style={styles.nextIcon} source={Icons.rightArrow} />
    </TouchableOpacity>
  );

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={"#fff"} />
      <BackNav />
      <View>
        <Selectable
          items={methods}
          selectedItem={selectedMethod}
          setSelectedItem={setSelectedMethod}
          label="Payment method"
          description={`Currently have ${paymentMethods.length} payment methods`}
          labelStyle={{ fontSize: 24, marginTop: 20 }}
        />
      </View>
      <FlatList
        data={paymentMethods}
        renderItem={renderPaymentItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scrollViewContent}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />

      <Button
        title={"Add new payment method"}
        style={{ backgroundColor: Colors.primary }}
        textStyle={{ color: "#fff" }}
        onPress={() => navigation.navigate("AddPaymentMethod")}
      />
    </Container>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  portfolioItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 16,
  },
  iconWrapper: {
    backgroundColor: Colors.offWhite,
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  nextIcon: {
    width: 20,
    height: 20,
  },
  portfolioText: {
    fontSize: 16,
    fontFamily: "Urbanist-SemiBold",
  },
  scrollViewContent: {
    paddingTop: 20,
  },
  divider: {
    borderTopColor: "#E6E6E6",
    borderTopWidth: 1,
    marginVertical: 10,
  },
});

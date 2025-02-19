import React from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Colors } from "../constants/Colors";
import Icons from "../constants/Icons";

const BottomSheetContent = ({
  portfolios,
  selectedItem,
  onSelect,
  closeSheet,
}) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        onSelect(item.id);
        closeSheet();
      }}
      style={styles.dropdownItem}
    >
      <View style={styles.iconContainer}>
        <Image source={Icons.dollarJar} style={styles.iconImage} />
      </View>
      <Text style={styles.portfolioText}>{item.name}</Text>
      <View style={styles.circle}>
        {selectedItem === item.id && <View style={styles.selectedCircle} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.modalContent}>
      <FlatList
        data={portfolios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.offWhite,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: Colors.offWhite,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginRight: 10,
  },
  iconImage: {
    width: 22,
    height: 22,
  },
  portfolioText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
});

export default BottomSheetContent;

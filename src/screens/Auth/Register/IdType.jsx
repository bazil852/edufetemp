import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackNav from "../../../components/BackNav";
import Container from "../../../components/Container";
import * as ImagePicker from "expo-image-picker";
import { idTypes } from "../../../utils/Index";
import ConfirmationModal from "../../../components/ConfirmationModal";
import IdTypeItem from "../../../components/IdTypeItem";
import { Colors } from "../../../constants/Colors";
import { StatusBar } from "expo-status-bar";
import Api from "../../../api";
import { profileAtom, userPersonalDataAtom } from "../../../atoms/global";
import { useAtom } from "jotai";

const IdType = () => {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [, setProfile] = useAtom(profileAtom);
  const [userData] = useAtom(userPersonalDataAtom);

  // useEffect(() => {
  //   if (photo) {
  //     setIsCropping(true);
  //   } else {
  //     setIsCropping(false);
  //   }
  // }, [photo]);

  const openCameraForPassport = async (type) => {
    setSelectedType(type);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "You need to grant camera access.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0]);
      setTimeout(() => {
        setIsCropping(true);
      }, 1000);
      // setIsCropping(true);
    }
  };

  const handleRetakePhoto = () => {
    setPhoto(null);
    setIsCropping(false);
    openCameraForPassport();
  };

  const handleConfirmPhoto = async () => {
    console.log(selectedType);

    const res = await Api.uploadFile("identity-verification", photo, {
      formname: "idImage",
      otherFields: [{ name: "idType", value: selectedType }],
    });

    console.log(res);

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    const res2 = await Api.getProfile("relation/" + userData.id);

    if (res2?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    setProfile(res2);

    setPhoto(null);
    setIsCropping(false);
    navigation.navigate("ReviewAndPermission");

    // setIsCropping(false);
    // navigation.navigate("ReviewAndPermission");
  };

  const renderIdTypeItem = ({ item }) => (
    <IdTypeItem item={item} onPress={() => openCameraForPassport(item.value)} />
  );

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={"#fff"} />
      <BackNav />
      <View style={styles.headerContainer}>
        <Text style={styles.verifyIdText}>Select your ID type</Text>
        <Text style={styles.verifyDesc}>
          We’ll take 2 pictures of your ID. What ID would you like to use?
        </Text>
      </View>

      <FlatList
        data={idTypes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderIdTypeItem}
      />

      <ConfirmationModal
        isVisible={isCropping}
        photo={photo}
        onRetake={handleRetakePhoto}
        onConfirm={handleConfirmPhoto}
        type={selectedType}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 20,
  },
  verifyIdText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 24,
    marginBottom: 10,
  },
  verifyDesc: {
    color: Colors.gray,
    fontFamily: "Urbanist-Medium",
    marginBottom: 24,
    fontSize: 14,
  },
});

export default IdType;

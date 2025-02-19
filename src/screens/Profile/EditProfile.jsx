import * as ImagePicker from "expo-image-picker";

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Container from "../../components/Container";
import BackNav from "../../components/BackNav";
import { Colors } from "../../constants/Colors";
import Images from "../../constants/Images";
import Icons from "../../constants/Icons";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { useAtom } from "jotai";
import { profileAtom, userPersonalDataAtom } from "../../atoms/global";
import Api from "../../api";

const EditProfile = ({ route }) => {
  const [userData, setProfile] = useAtom(profileAtom);
  const [data, setData] = useState({
    fullName: userData?.fullName,
    email: userData?.email,
    phoneNo: userData?.phoneNo,
    bio: userData?.bio,
  });
  const [avatar, setAvatar] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setAvatar(result.assets[0]);
    }
  };

  const handleSave = async () => {
    if (avatar) {
      const res = await Api.updateFile(
        "user/upload-profile-photo/" + userData.id,
        avatar,
        {
          formname: "avatar",
          otherFields: [],
        }
      );

      if (res?.error) {
        Alert.alert("Error", res?.error);
        return;
      }
    }

    const upRes = await Api.updateProfile(userData.id, {
      fullName: data.fullName,
      email: data.email,
      phoneNo: data.phoneNo,
      bio: data.bio,
    });

    if (upRes?.error) {
      Alert.alert("Error", upRes?.error);
      return;
    }

    Alert.alert("Success", "Profile updated successfully");

    const res2 = await Api.getProfile("relation/" + userData.id);

    if (res2?.error) {
      Alert.alert("Error", res2?.error);
      return;
    }

    setProfile(res2);
  };

  // const { name, dp, email, phone } = route.params;
  return (
    <Container>
      <BackNav />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.forgotText}>Edit Profile</Text>
          <Text style={styles.linkText}>Make changes in your profile</Text>
        </View>
        <View
          style={{ borderTopColor: Colors.offWhite, borderTopWidth: 2 }}
        ></View>
        <TouchableOpacity
          style={{
            position: "relative",
            width: 96,
            height: 96,
            marginHorizontal: "auto",
            marginVertical: 20,
          }}
          onPress={pickImage}
        >
          <Image
            source={
              avatar
                ? { uri: avatar.uri }
                : userData.photo
                ? { uri: userData.photo }
                : Images.dp
            }
            style={styles.profileImage}
          />
          <Image
            source={Icons.camera}
            style={{
              width: 40,
              height: 40,
              tintColor: "#fff",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: [{ translateX: -20 }, { translateY: -20 }],
            }}
          />
        </TouchableOpacity>
        <InputField
          label={"Full Name"}
          value={data?.fullName}
          onChangeText={(value) =>
            setData((prev) => ({ ...prev, fullName: value }))
          }
        />
        <InputField label={"Email"} value={data?.email} />
        <View style={styles.mobContainer}>
          <InputField label={"Phone"} value={data?.phoneNo} />
          <Image style={styles.flag} source={Images.flag} />
        </View>
        <InputField
          label={"Bio"}
          value={data?.bio}
          onChangeText={(value) => setData((prev) => ({ ...prev, bio: value }))}
        />
      </ScrollView>
      <Button
        title={"Save Changes"}
        style={{ backgroundColor: Colors.primary }}
        textStyle={{ color: "#fff" }}
        onPress={handleSave}
      />
    </Container>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 100,
  },
  headerContainer: {
    marginTop: 20,
  },
  forgotText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 24,
    marginBottom: 10,
  },
  linkText: {
    color: Colors.gray,
    fontFamily: "Urbanist-Medium",
    marginBottom: 24,
  },
  mobContainer: {
    position: "relative",
    marginVertical: 10, // Adjust margin if needed
  },
  flag: {
    position: "absolute",
    top: "50%", // Center the flag vertically
    right: 16, // Adjust horizontal position if needed
    width: 24,
    height: 16,
    transform: [{ translateY: -8 }], // Center the flag vertically
  },
});

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
} from "react-native";
import React, { useRef, useState } from "react";
import Container from "../../components/Container";
import Images from "../../constants/Images";
import Icons from "../../constants/Icons";
import { Colors } from "../../constants/Colors";
import Button from "../../components/Button";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "../../components/BottomSheet";
import { Switch } from "react-native-paper";
import { useAtom } from "jotai";
import {
  isLoginAtom,
  profileAtom,
  userPersonalDataAtom,
} from "../../atoms/global";

const Profile = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);

  const [, setIsLogin] = useAtom(isLoginAtom);
  // const [profile, setProfile] = useAtom(profileAtom);
  const [userInfo, setUserData] = useAtom(profileAtom);
  console.log("Profile", userInfo);

  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  const [isPushNotificationsEnabled, setIsPushNotificationsEnabled] =
    useState(false);
  const [isSmsEnabled, setIsSmsEnabled] = useState(false);

  // const userInfo = {
  //   name: "User Name",
  //   email: "user@example.com",
  //   phoneNo: "+1234567890",
  //   photo: Images.dp,
  // };

  const profileItems = [
    {
      icon: Icons.security,
      title: "Security",
      subtitle: "Face ID, Passcode",
      onPress: () => navigation.navigate("ConfirmPin"),
    },
    {
      icon: Icons.paymentMethod,
      title: "Payment Methods",
      subtitle: "Add or manage payment methods",
      onPress: () => navigation.navigate("PaymentMethod"),
    },
    {
      icon: Icons.blackBell,
      title: "Notifications",
      subtitle: "Manage your notification settings",
      onPress: () => bottomSheetRef.current?.open(),
    },
    {
      icon: Icons.help,
      title: "Need Help",
      subtitle: "Get support or contact us",
    },
    {
      icon: Icons.shareArr,
      title: "Invite",
      subtitle: "Invite friends to join",
      onPress: async () => {
        try {
          await Share.share({
            message:
              "Join Edufe, the best learning platform! Download now: https://example.com",
          });
        } catch (error) {
          console.error(error.message);
        }
      },
    },
    {
      icon: Icons.logout,
      title: "Logout",
      subtitle: "Sign out of your account",
      onPress: () => {
        setUserData(null);
        setIsLogin(false);
      },
    },
  ];

  return (
    <Container>
      <StatusBar color={"#fff"} />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
       >
        {/* Profile Image and Information */}
        <View style={styles.profileInfoContainer}>
          <Image
            source={userInfo.photo ? { uri: userInfo.photo } : Images.dp}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{userInfo.fullName}</Text>
          <Text style={styles.email}>{userInfo.email}</Text>
          <View style={styles.phoneContainer}>
            <Image source={Images.flag} style={styles.flag} />
            <Text style={styles.phone}>{userInfo.phoneNo}</Text>
          </View>
        </View>

        {/* View Profile Button */}
        <Button
          style={styles.viewProfileButton}
          title="View Profile"
          textStyle={styles.viewProfileButtonText}
          onPress={() =>
            navigation.navigate("ProfileDetail", {
              ...userInfo,
            })
          }
        />

        {/* Settings Sections */}
        {profileItems.map((item, index) => (
          <TouchableOpacity key={index} onPress={item.onPress}>
            <View style={styles.itemContainer}>
              <View style={styles.itemRow}>
                <Image style={styles.icon} source={item.icon} />
                <View style={styles.itemText}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Image
                style={[
                  styles.arrowIcon,
                  item.title === "Logout" && styles.logoutArrow,
                ]}
                source={Icons.rightArrow}
              />
            </View>
            {index !== profileItems.length - 1 && (
              <View style={styles.divider} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        title="Notifications"
        description="Push notifications & updates"
        height={430}
      >
        <View style={{ marginTop: 20 }}>
          {[
            {
              label: "Email Notifications",
              state: isEmailEnabled,
              setter: setIsEmailEnabled,
            },
            {
              label: "Push Notifications",
              state: isPushNotificationsEnabled,
              setter: setIsPushNotificationsEnabled,
            },
            {
              label: "SMS Notifications",
              state: isSmsEnabled,
              setter: setIsSmsEnabled,
            },
          ].map(({ label, state, setter }, idx) => (
            <React.Fragment key={idx}>
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>{label}</Text>
                <Switch
                  style={{ transform: [{ scale: 1.5 }] }}
                  value={state}
                  onValueChange={() => setter(!state)}
                  color={Colors.primary}
                />
              </View>
              {idx < 2 && <View style={styles.dividerLine}></View>}
            </React.Fragment>
          ))}
          <Button
            title="Save Changes"
            style={{ backgroundColor: Colors.primary, marginTop: 20 }}
            textStyle={{ color: "#fff" }}
          />
        </View>
      </BottomSheet>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 20,
  },
  profileInfoContainer: {
    alignItems: "center",
    marginTop: 30,
    gap: 5,
  },
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
  viewProfileButton: {
    backgroundColor: Colors.offWhite,
    marginVertical: 20,
  },
  viewProfileButtonText: {
    color: Colors.primary,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "start",
    gap: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  itemText: {
    gap: 3,
  },
  itemTitle: {
    fontFamily: "Urbanist-Medium",
    fontSize: 14,
  },
  itemSubtitle: {
    fontFamily: "Urbanist-Medium",
    fontSize: 12,
    color: Colors.gray,
  },
  arrowIcon: {
    width: 24,
    height: 24,
  },
  logoutArrow: {
    tintColor: "#FF3F3F",
  },
  divider: {
    height: 2,
    marginVertical: 20,
    backgroundColor: Colors.offWhite,
  },
  dividerLine: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 2,
    marginVertical: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchLabel: {
    fontFamily: "Urbanist-Medium",
    fontSize: 14,
    flex: 1,
  },
});

export default Profile;

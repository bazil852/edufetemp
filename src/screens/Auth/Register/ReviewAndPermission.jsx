import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../../constants/Colors";
import BackNav from "../../../components/BackNav";
import Button from "../../../components/Button";
import Icons from "../../../constants/Icons";
import BottomSheet from "../../../components/BottomSheet"; // Import the BottomSheet
import { Switch } from "react-native-paper";
import Container from "../../../components/Container";
import { useNavigation } from "@react-navigation/native";
import Images from "../../../constants/Images";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import { profileAtom } from "../../../atoms/global";
import { idTypes } from "../../../utils/Index";
import { IdCardIcon } from "../../../svgs/IdCardIcon";
import { FaceIdIcon } from "../../../svgs/FaceIdIcon";

const ReviewAndPermission = () => {
  const navigation = useNavigation();
  const refFaceIdSheet = useRef();
  const refNotificationSheet = useRef();
  const refFinalSheet = useRef();
  const [profile] = useAtom(profileAtom);
  const [isFaceIdEnabled, setIsFaceIdEnabled] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const toggleFaceIdSwitch = () =>
    setIsFaceIdEnabled((previousState) => !previousState);
  const toggleNotificationsSwitch = () =>
    setIsNotificationsEnabled((previousState) => !previousState);

  const handleMaybeLater = () => {
    refFaceIdSheet.current.close();
    setTimeout(() => {
      refNotificationSheet.current.open();
    }, 300);
  };

  const handleMaybeLater2 = () => {
    refNotificationSheet.current.close();
    setTimeout(() => {
      refFinalSheet.current.open();
    }, 300);
  };

  const handlePaymentMethod = () => {
    refNotificationSheet.current.close();
    navigation.navigate("AddPaymentMethod");
  };

  console.log(profile);

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <StatusBar barStyle="light-content" backgroundColor={"#fff"} />
        <BackNav />
        <View style={styles.infoContainer}>
          <IdCardIcon width={48} height={48} />
          <Text style={styles.title}>We’re reviewing your info now</Text>
          <Text style={styles.subtitle}>
            You can explore the app as a guest while you wait. We will notify
            you through your email once it’s done
          </Text>

          {profile?.identityVerifications &&
            profile?.identityVerifications.length > 0 &&
            profile?.identityVerifications?.map((item) => (
              <View style={styles.itemContainer} key={item.id}>
                <TouchableOpacity style={styles.itemContent}>
                  <Image style={styles.icon} source={Icons.idCard} />
                  <View style={styles.textContainer}>
                    <Text style={styles.itemLabel}>
                      {idTypes.find((i) => i.value == item.idType)?.label}
                    </Text>
                  </View>
                  <Text style={styles.status}>{STATUS[item.status]}</Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>

      <View style={styles.btnContainer}>
        <Button
          title={"Continue"}
          style={styles.continueButton}
          textStyle={styles.buttonText}
          onPress={() => refFaceIdSheet.current.open()}
        />
      </View>

      <BottomSheet
        ref={refFaceIdSheet}
        title="Let’s set up some permissions"
        subtitle="Configure Your Device to Use Face ID for Enhanced Security and Stay Informed with Real-Time Updates"
        imageSource={FaceIdIcon}
        height={540}
      >
        <View style={styles.switchContainer}>
          <View style={styles.switchRow}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Login with Face ID</Text>
              <Text style={styles.subtitle}>
                Access your account quickly and securely
              </Text>
            </View>
            <Switch
              value={isFaceIdEnabled}
              onValueChange={toggleFaceIdSwitch}
              color={Colors.primary}
              style={styles.switch}
            />
          </View>
          <View style={styles.divider}></View>
          <View style={styles.switchRow}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Get notifications</Text>
              <Text style={styles.subtitle}>
                Don’t miss your important EDUFE updates
              </Text>
            </View>
            <Switch
              value={isNotificationsEnabled}
              onValueChange={toggleNotificationsSwitch}
              color={Colors.primary}
              style={styles.switch}
            />
          </View>
        </View>
        <View style={{ marginTop: 24 }}>
          <Button
            style={styles.continueButton}
            title={"Allow Permissions"}
            textStyle={styles.buttonText}
            onPress={handleMaybeLater}
          />
          <Button
            style={[styles.maybeLaterButton, styles.buttonText]}
            title={"Maybe Later"}
            onPress={handleMaybeLater2}
          />
        </View>
      </BottomSheet>

      <BottomSheet
        ref={refNotificationSheet}
        title="Turn on notifications?"
        subtitle="We’ll send you important reminders about your EDUFE account - not too many, and not too often"
        imageSource={Icons.notifyBell}
        height={660}
      >
        <Image
          source={Images.whistle}
          style={{
            width: 180,
            height: 320,
            marginHorizontal: "auto",
          }}
        />
        <Button
          style={styles.continueButton}
          title={"Allow Notifications"}
          textStyle={styles.buttonText}
        />
        <Button
          style={[styles.maybeLaterButton, styles.buttonText]}
          title={"Maybe Later"}
          onPress={handleMaybeLater2}
        />
      </BottomSheet>

      <BottomSheet
        ref={refFinalSheet}
        title="Account Created!"
        subtitle="You have successfully made your account. All your account details and preferences are saved. Let's grow your wealth!"
        imageSource={Icons.check}
        height={380}
      >
        <Button
          style={[styles.continueButton, { marginTop: 24 }]}
          title={"Proceed to home"}
          textStyle={styles.buttonText}
          onPress={() => {
            // navigation.navigate("TabNavigator");
            navigation.reset({ index: 0, routes: [{ name: "TabNavigator" }] });
          }}
        />
        <Button
          style={[styles.maybeLaterButton, styles.buttonText]}
          title={"Add payment method"}
          onPress={handlePaymentMethod}
        />
      </BottomSheet>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  infoContainer: {
    marginTop: 10,
  },
  icon: {
    width: 48,
    height: 48,
  },
  title: {
    fontSize: 18,
    fontFamily: "Urbanist-Bold",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Urbanist-Medium",
    marginTop: 5,
    lineHeight: 24,
  },
  itemContainer: {
    borderTopColor: "#E6E6E6",
    borderTopWidth: 1,
    marginTop: 20,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 24,
  },
  itemLabel: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "Urbanist-Bold",
  },
  status: {
    color: Colors.gray,
    fontSize: 12,
    marginLeft: "auto",
  },
  continueButton: {
    backgroundColor: Colors.primary,
  },
  maybeLaterButton: {
    borderColor: Colors.primary,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  divider: {
    borderTopColor: "#E6E6E6",
    borderTopWidth: 1,
    marginVertical: 16,
  },
  switch: {
    transform: [{ scale: 1.5 }], // Adjust the size of the switch
  },
});

const STATUS = {
  PENDING: "Under Review..",
  VERIFIED: "Verified",
  REJECTED: "Rejected",
};

export default ReviewAndPermission;

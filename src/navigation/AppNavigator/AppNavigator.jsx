// NAVIGATION
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VerifyScreen from "../../screens/Auth/Register/Verify";
import IdType from "../../screens/Auth/Register/IdType";
import ReviewAndPermission from "../../screens/Auth/Register/ReviewAndPermission";
import VerifyId from "../../screens/Auth/Register/VerifyId";
import HomeScreen from "../../screens/Home/Home";
import PaymentMethod from "../../screens/Payment/PaymentMethod";
import AddPaymentMethod from "../../screens/Payment/AddPaymentMethod";
import SelectBank from "../../screens/Payment/SelectBank";
import CardDetails from "../../screens/Payment/CardDetails";
import TabNavigator from "../TabNavigator/TabNavigator";
import Notifications from "../../screens/Notifications/Notifications";
import InvestmentFunds from "../../screens/InvestmentFunds/InvestmentFunds";
import FundDetails from "../../screens/InvestmentFunds/FundDetails";
import FundsOtp from "../../screens/InvestmentFunds/FundsOtp";
import GraphDetails from "../../screens/Portfolio/Portfolio";
import WithdrawFunds from "../../screens/Portfolio/WithdrawFunds";
import SellPortfolio from "../../screens/SellPortfolio/SellPortfolio";
import PayoutDetails from "../../screens/Portfolio/PayoutDetails";
import ConfirmTransfer from "../../screens/Portfolio/ConfirmTransfer";
import TransferOTP from "../../screens/Portfolio/TransferOTP";
import TransactionDetail from "../../screens/Wallet/TransactionDetail";
import ProfileDetail from "../../screens/Profile/ProfileDetail";
import EditProfile from "../../screens/Profile/EditProfile";
import ConfirmPin from "../../screens/Profile/ConfirmPin";
import EditBankAccount from "../../screens/Payment/EditBankAccount";
import AddWithdrawFunds from "../../screens/Wallet/AddWithdfrawFunds";
import SavedPortfolios from "../../screens/MarketPlace/SavedPortfolios";
import MobileField from "../../screens/Auth/Register/MobileField";
import { useEffect } from "react";
import {
  isLoginAtom,
  profileAtom,
  userPersonalDataAtom,
} from "../../atoms/global";
import { useAtom } from "jotai";
import { Alert } from "react-native";

import Listings from "../../screens/MarketPlace/Listings";
import MarketPlaceDetail from "../../screens/MarketPlace/MarketPlaceDetail";
import SellerProfileDetail from "../../screens/Seller/ProfileDetail";
const Stack = createNativeStackNavigator();

export default function AppNavigator({ navRef }) {
  const [isLogin] = useAtom(isLoginAtom);
  const [userData] = useAtom(userPersonalDataAtom);
  const [profile] = useAtom(profileAtom);

  useEffect(() => {
    if (!isLogin) return;
    if (!profile) return;

    // console.log("Profile", profile);

    if (!profile?.phoneNo) {
      console.log("Phone Number");
      Alert.alert("Attention!", "Please update your phone number");
      navRef.current?.reset({ index: 0, routes: [{ name: "MobileField" }] });
      return;
    }

    if (!profile?.isPhoneNoVerified) {
      console.log("Phone Number");
      Alert.alert("Error", "Please verify your phone number");
      navRef.current?.reset({
        index: 0,
        routes: [
          { name: "VerifyScreen", params: { phoneNumber: profile?.phoneNo } },
        ],
      });
      return;
    }

    if (profile?.identityVerifications?.length === 0) {
      console.log("Identity Verification");
      Alert.alert("Error", "Please upload your identity verification");
      navRef.current?.reset({ index: 0, routes: [{ name: "VerifyImg" }] });
    }
    // navRef.current?.reset({ index: 0, routes: [{ name: "VerifyImg" }] });
  }, [isLogin, profile?.id]);

  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      <Stack.Screen name="TabNavigator" component={TabNavigator} />

      <Stack.Screen name="MobileField" component={MobileField} />

      <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
      <Stack.Screen name="VerifyImg" component={VerifyId} />
      <Stack.Screen name="IdType" component={IdType} />

      <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethod} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="EditBankAccount" component={EditBankAccount} />

      <Stack.Screen name="SelectBank" component={SelectBank} />
      <Stack.Screen name="CardDetails" component={CardDetails} />
      <Stack.Screen
        name="ReviewAndPermission"
        component={ReviewAndPermission}
      />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="InvestmentFunds" component={InvestmentFunds} />
      <Stack.Screen name="FundDetails" component={FundDetails} />
      <Stack.Screen name="FundsOtp" component={FundsOtp} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="GraphDetails" component={GraphDetails} />
      <Stack.Screen name="SellPortfolio" component={SellPortfolio} />
      <Stack.Screen name="Listings" component={Listings} />
      <Stack.Screen name="WithdrawFunds" component={WithdrawFunds} />
      <Stack.Screen name="PayoutDetails" component={PayoutDetails} />
      <Stack.Screen name="ConfirmTransfer" component={ConfirmTransfer} />
      <Stack.Screen name="TransferOTP" component={TransferOTP} />
      <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
      <Stack.Screen name="AddWithdrawFunds" component={AddWithdrawFunds} />
      <Stack.Screen name="SavedPortfolios" component={SavedPortfolios} />
      <Stack.Screen name="MarketPlaceDetail" component={MarketPlaceDetail} />
      <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
      <Stack.Screen
        name="SellerProfileDetail"
        component={SellerProfileDetail}
      />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ConfirmPin" component={ConfirmPin} />
    </Stack.Navigator>
  );
}

import "./src/config/axios";

import React, { useEffect, useRef, useState } from "react";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator/AppNavigator";
import { useAtom } from "jotai";
import {
  isLoginAtom,
  portfolioAtom,
  profileAtom,
  userPersonalDataAtom,
} from "./src/atoms/global";
import AuthNavigator from "./src/navigation/AuthNavigator/AuthNavigator";
import Api from "./src/api";
import { Alert, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-native-paper";
import { AppProvider } from "./src/contexts/appContext";
import { useNotifications } from "./src/hooks/useNotifications";

SplashScreen.preventAutoHideAsync();

let logoutTimer;

export default function App() {
  const { AskForPermission } = useNotifications();
  const [isLogin, setIsLogin] = useAtom(isLoginAtom);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setProfile] = useAtom(profileAtom);
  const [userData, setUserData] = useAtom(userPersonalDataAtom);
  const [, setPortfolios] = useAtom(portfolioAtom);

  const [timer, setTimer] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const navRef = useRef(null);

  const [fontsLoaded] = useFonts({
    "Urbanist-Bold": require("./src/assets/fonts/Urbanist-Bold.ttf"),
    "Urbanist-ExtraBold": require("./src/assets/fonts/Urbanist-ExtraBold.ttf"),
    "Urbanist-Light": require("./src/assets/fonts/Urbanist-Light.ttf"),
    "Urbanist-Medium": require("./src/assets/fonts/Urbanist-Medium.ttf"),
    "Urbanist-Regular": require("./src/assets/fonts/Urbanist-Regular.ttf"),
    "Urbanist-SemiBold": require("./src/assets/fonts/Urbanist-SemiBold.ttf"),
    "Urbanist-Italic": require("./src/assets/fonts/Urbanist-Italic.ttf"),
  });

  useEffect(() => {
    const getUserData = async () => {
      const data = await AsyncStorage.getItem("isLogin1");

      if (!data || data === "null" || data === "false") {
        setIsReady(true);
        logout();
        return;
      }

      const parsedData = JSON.parse(data);

      if (!parsedData?.accessToken) {
        setIsReady(true);
        logout();
        return;
      }

      const expiresIn = new Date(parsedData?.expiresIn);

      if (new Date() > expiresIn) {
        setIsReady(true);
        logout();
        return;
      }

      // setTimer(expiresIn);
    };

    getUserData();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      if (!isLogin || !userData) return;

      handleToken(userData);

      setTimer(new Date(isLogin?.expiresIn));

      getProfile();

      getUserPortfolios();

      setIsLoggedIn(true);
    };

    getUserData();
  }, [isLogin, userData?.id]);

  const handleToken = async (user) => {
    const token = await AskForPermission();

    if (!token) return;
    if (!user?.id) return;

    const res = await Api.registerToken(user?.id, {
      pushToken: token,
      platform: Platform.OS,
    });
  };

  useEffect(() => {
    if (isLogin?.accessToken && timer) {
      const rt = timer.getTime() - new Date();
      logoutTimer = setTimeout(logout, rt);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [isLogin?.accessToken, timer]);

  const logout = () => {
    setIsLogin(null);
    setProfile(null);
    setTimer(null);
    setUserData(null);
    setPortfolios([]);
  };

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const getProfile = async () => {
    const res = await Api.getProfile("relation/" + userData.id);

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    setProfile(res);
    setIsReady(true);
  };

  const getUserPortfolios = async () => {
    const res = await Api.getUserPortfolios("/" + userData.id);

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    setPortfolios(res);
  };

  if (!fontsLoaded || !isReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider>
        <NavigationContainer ref={navRef}>
          <AppProvider>
            {!isLogin ? (
              <AuthNavigator />
            ) : (
              <>
                <AppNavigator navRef={navRef} />
              </>
            )}
          </AppProvider>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}

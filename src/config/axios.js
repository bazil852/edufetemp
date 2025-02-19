import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { Alert } from "react-native";

async function getToken() {
  const data = await AsyncStorage.getItem("isLogin1");

  if (data) {
    const parsedData = JSON.parse(data);

    if (parsedData?.accessToken) return parsedData?.accessToken;
    else return "";
  } else {
    return "";
  }
}

axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  async (config) => {
    const { isConnected } = await NetInfo?.fetch();

    if (!isConnected) {
      Alert.alert("No internet connection");
      return Promise.reject("No internet connection");
    }

    const token = config.headers.Authorization
      ? config.headers.Authorization
      : "Bearer " + (await getToken());
    config.headers.Authorization = `${token}`;

    console.log(config.headers.Authorization);

    return config;
  },
  (error) => {
    // Alert.alert(error?.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Alert.alert(error?.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default axios;

import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Text, Alert } from "react-native";
import Container from "../../components/Container";
import BackNav from "../../components/BackNav";
import { Colors } from "../../constants/Colors";
import { notificationsData } from "../../utils/Index";
import { StatusBar } from "expo-status-bar";

import NotificationItem from "../../components/NotificationItem";
import EmptyNotifications from "../../components/EmptyNotifications";
import Separator from "../../components/Separator";
import { useAtom } from "jotai";
import { userPersonalDataAtom } from "../../atoms/global";
import Api from "../../api";

const Notifications = () => {
  const [userData] = useAtom(userPersonalDataAtom);

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await Api.getNotifications(userData?.id);

      if (res?.error) {
        Alert.alert("Error", res?.error);
        return;
      }

      setData(res?.notifications);
    };

    getData();
  }, []);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={"#fff"} />
      <BackNav />
      <View style={styles.headerContainer}>
        <Text style={styles.notifyText}>Notifications</Text>
        <Text style={styles.notifyDesc}>
          Updates and notifications at one place
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NotificationItem item={item} />}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={styles.scrollViewContent}
        ListEmptyComponent={EmptyNotifications}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerContainer: {
    marginTop: 20,
  },
  notifyText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 24,
    marginBottom: 10,
  },
  notifyDesc: {
    color: Colors.gray,
    fontFamily: "Urbanist-Medium",
    marginBottom: 24,
    fontSize: 14,
  },
});

export default Notifications;

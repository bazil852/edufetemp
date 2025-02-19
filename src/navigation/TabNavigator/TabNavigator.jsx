import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View, Text } from "react-native";
import HomeScreen from "../../screens/Home/Home";
import { Colors } from "../../constants/Colors"; // Your custom colors
import WalletScreen from "../../screens/Wallet/Wallet";
import Profile from "../../screens/Profile/Profile";
import MarketPlace from "../../screens/MarketPlace/MarketPlace";
import Learn from "../../screens/Learn/Learn";
import { Tab1Icon } from "../../svgs/Tab1Icon";
import { Tab2Icon } from "../../svgs/Tab2Icon";
import { Tab3Icon } from "../../svgs/Tab3Icon";
import { Tab3IconFilled } from "../../svgs/Tab3IconFilled";
import { Tab4Icon } from "../../svgs/Tab4Icon";
import { Tab4IconFilled } from "../../svgs/Tab4IconFilled";
import { Tab5Icon } from "../../svgs/Tab5Icon";

const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, icon, iconOutline, label }) => {
  const iconToRender = focused ? icon : iconOutline;
  return (
    <View style={{ alignItems: "center" }}>
      {iconToRender}
      <Text
        style={{
          marginTop: 4,
          fontSize: 12,
          fontFamily: "Urbanist-Medium",
          color: focused ? Colors.primary : Colors.gray,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

const iconMapping = {
  Home: {
    filled: <Tab1Icon color={Colors.primary} stroke={Colors.primary} />,
    outlined: <Tab1Icon />,
  },
  Wallet: {
    filled: (
      <Tab2Icon
        color={Colors.primary}
        stroke={Colors.primary}
        stroke2="white"
      />
    ),
    outlined: <Tab2Icon />,
  },
  MarketPlace: {
    filled: <Tab3IconFilled />,
    outlined: <Tab3Icon color={Colors.primary} stroke={Colors.primary} />,
  },
  Learn: {
    filled: <Tab4IconFilled />,
    outlined: <Tab4Icon />,
  },
  Profile: {
    filled: <Tab5Icon color={Colors.primary} stroke={Colors.primary} />,
    outlined: <Tab5Icon />,
  },
};

export default function TabNavigator() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            height: 88, // Set the height of the tab bar
            paddingBottom: 5,
            borderTopColor: "#D9D9D9",
            borderTopWidth: 2,
          },
          tabBarIcon: ({ focused }) => {
            const { filled, outlined } = iconMapping[route.name] || {};
            return (
              <TabIcon
                focused={focused}
                icon={filled}
                iconOutline={outlined}
                label={route.name}
              />
            );
          },
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Wallet" component={WalletScreen} />
        <Tab.Screen name="MarketPlace" component={MarketPlace} />
        <Tab.Screen name="Learn" component={Learn} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </View>
  );
}

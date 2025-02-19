// NAVIGATION
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "../../screens/Splash/Splash";
import OnBoarding from "../../screens/OnBoarding/OnBoarding";
import SignIn from "../../screens/Auth/SignIn/SignIn";
import ForgotPass from "../../screens/Auth/ForgotPass";
import Register from "../../screens/Auth/Register/Register";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
    </Stack.Navigator>
  );
}

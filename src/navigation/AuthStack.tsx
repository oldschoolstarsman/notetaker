import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/SignUp";
import { Routes } from "../constants";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName={Routes.LogIn}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Routes.LogIn} component={LoginScreen} />
      <Stack.Screen name={Routes.SignUp} component={SignUpScreen} />
    </Stack.Navigator>
  );
}

export default AuthStack;

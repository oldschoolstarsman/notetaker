import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text } from "react-native";
import { GlobalStyles } from "../constants";
import NotesList from "./NotesList";

const Tab = createMaterialTopTabNavigator();

export function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="All"
      style={{
        elevation: 0,
        borderBottomColor: "white",
      }}
      screenOptions={{
        tabBarPressColor: "transparent",
        tabBarIndicatorStyle: {
          backgroundColor: GlobalStyles.colors.black,
        },
        tabBarGap: 10,
        tabBarBounces: true,
        tabBarStyle: {
          elevation: 0,
          marginHorizontal: 30,
        },
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontFamily: "nunito",
        },
        tabBarActiveTintColor: GlobalStyles.colors.black,
        tabBarInactiveTintColor: GlobalStyles.colors.darkKey,
      }}
    >
      <Tab.Screen
        name="All"
        component={NotesList}
        options={{ tabBarLabel: "All" }}
      />
      <Tab.Screen
        name="Favorites"
        component={NotesList}
        options={{ tabBarLabel: "Favorites" }}
      />
    </Tab.Navigator>
  );
}

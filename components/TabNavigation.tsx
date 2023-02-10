import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
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
        backgroundColor: "red",
      }}
      screenOptions={{
        tabBarPressColor: "transparent",
        tabBarIndicatorStyle: { backgroundColor: GlobalStyles.colors.black },
        tabBarStyle: { elevation: 0 },
        tabBarLabelStyle: { fontWeight: "600" },
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

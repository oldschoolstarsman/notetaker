import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GlobalStyles, NavigationTabs } from "../constants";
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
          backgroundColor: GlobalStyles.colors.lighterDark,
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
        tabBarActiveTintColor: GlobalStyles.colors.lighterDark,
        tabBarInactiveTintColor: GlobalStyles.colors.darkGrey,
      }}
    >
      <Tab.Screen name={NavigationTabs.All} component={NotesList} />
      <Tab.Screen name={NavigationTabs.Favorites} component={NotesList} />
    </Tab.Navigator>
  );
}

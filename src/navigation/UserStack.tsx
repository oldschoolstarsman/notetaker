import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalStyles, Routes } from "../constants";
import NoteEditor from "../screens/NoteEditor";
import NotesListScreen from "../screens/NotesList";

const Stack = createNativeStackNavigator();

function UserStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: GlobalStyles.colors.lighterDark,
        contentStyle: { backgroundColor: GlobalStyles.colors.white },
        headerShadowVisible: false,
      }}
      initialRouteName={Routes.NotesList}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name={Routes.NotesList}
        component={NotesListScreen}
      />
      <Stack.Screen
        options={{ title: "All notes" }}
        name={Routes.NoteEditor}
        component={NoteEditor}
      />
    </Stack.Navigator>
  );
}

export default UserStack;

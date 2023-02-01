import BottomNavigation from "./components/BottomNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotesList from "./screens/NotesList";
import NoteEditor from "./screens/NoteEditor";
import { Routes } from "./constants";
import NotesContextProvider from "./store/userNotes-context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NotesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ statusBarColor: "black" }}
            initialRouteName={Routes.NotesList}
          >
            <Stack.Screen
              options={{ headerShown: false }}
              name={Routes.NotesList}
              component={NotesList}
            />
            <Stack.Screen name={Routes.NoteEditor} component={NoteEditor} />
          </Stack.Navigator>
          <BottomNavigation />
        </NavigationContainer>
      </NotesContextProvider>
    </>
  );
}

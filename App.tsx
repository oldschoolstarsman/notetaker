import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotesList from "./screens/NotesList";
import NoteEditor from "./screens/NoteEditor";
import { GlobalStyles, Routes } from "./constants";
import NotesContextProvider from "./store/userNotes-context";
import { StatusBar } from "react-native";
import { SheetProvider } from "react-native-actions-sheet";
import "./components/sheets/sheets";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NotesContextProvider>
        <StatusBar
          animated
          barStyle="light-content"
          showHideTransition="fade"
        />
        <NavigationContainer>
          <SheetProvider>
            <Stack.Navigator
              screenOptions={{
                statusBarColor: "black",
                contentStyle: { backgroundColor: GlobalStyles.colors.white },
                headerShadowVisible: false,
              }}
              initialRouteName={Routes.NotesList}
            >
              <Stack.Screen
                options={{ headerShown: false }}
                name={Routes.NotesList}
                component={NotesList}
              />
              <Stack.Screen
                options={{ title: "All notes" }}
                name={Routes.NoteEditor}
                component={NoteEditor}
              />
            </Stack.Navigator>
          </SheetProvider>
        </NavigationContainer>
      </NotesContextProvider>
    </>
  );
}

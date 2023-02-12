import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotesListScreen from "./screens/NotesList";
import NoteEditor from "./screens/NoteEditor";
import { GlobalStyles, Routes } from "./constants";
import { StatusBar, View } from "react-native";
import { SheetProvider } from "react-native-actions-sheet";
import "./components/sheets/sheets";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    nunito: require("./assets/fonts/nunito/NunitoRegular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar
            animated
            barStyle="light-content"
            showHideTransition="fade"
          />
          <NavigationContainer>
            <SheetProvider>
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
            </SheetProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </View>
  );
}

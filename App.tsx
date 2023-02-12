import "./src/config/firebase-config";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotesListScreen from "./src/screens/NotesList";
import NoteEditor from "./src/screens/NoteEditor";
import { GlobalStyles, Routes } from "./src/constants";
import { StatusBar, View } from "react-native";
import { SheetProvider } from "react-native-actions-sheet";
import "./src/components/sheets/sheets";
import { persistor, store } from "./src/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import RootNavigation from "./src/navigation";

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
            <RootNavigation />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </View>
  );
}

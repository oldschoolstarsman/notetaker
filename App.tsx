import BottomNavigation from "./components/BottomNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotesList from "./screens/NotesList";
import NoteEditor from "./screens/NoteEditor";
import { Routes } from "./constants";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Routes.NotesList}>
          <Stack.Screen name={Routes.NotesList} component={NotesList} />
          <Stack.Screen name={Routes.NoteEditor} component={NoteEditor} />
        </Stack.Navigator>
        <BottomNavigation />
      </NavigationContainer>
    </>
  );
}

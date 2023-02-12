import { NavigationContainer } from "@react-navigation/native";
import { SheetProvider } from "react-native-actions-sheet";
import { useAuth } from "../hooks/useAuth";
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";

export default function RootNavigation() {
  const { user } = useAuth();

  return <SheetProvider>{user ? <UserStack /> : <AuthStack />}</SheetProvider>;
}

import { SheetProvider } from "react-native-actions-sheet";
import { useAuth } from "../hooks/useAuth";
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";
import { GlobalStyles } from "../constants";
import { ActivityIndicator } from "react-native-paper";
import { VStack } from "@react-native-material/core";

export default function RootNavigation() {
  const { checkingStatus, loggedIn } = useAuth();

  if (checkingStatus) {
    return (
      <VStack fill center>
        <ActivityIndicator
          animating={true}
          color={GlobalStyles.colors.darkGrey}
        />
      </VStack>
    );
  }
  return (
    <SheetProvider>{loggedIn ? <UserStack /> : <AuthStack />}</SheetProvider>
  );
}

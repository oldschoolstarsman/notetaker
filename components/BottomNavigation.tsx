import { AppBar, IconButton, FAB } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../constants";

function BottomNavigation() {
  const navigation = useNavigation();
  return (
    <AppBar
      variant="bottom"
      color="white"
      leading={(props) => (
        <IconButton
          icon={(props) => <Icon name="menu" {...props} />}
          {...props}
        />
      )}
      trailing={(props) => (
        <IconButton
          icon={(props) => <Icon name="magnify" {...props} />}
          {...props}
        />
      )}
      style={{ position: "absolute", start: 0, end: 0, bottom: 0 }}
    >
      <FAB
        onPress={() => navigation.navigate(Routes.NoteEditor)}
        color="black"
        icon={(props) => <Icon name="plus" {...props} />}
        style={{ position: "absolute", top: -28, alignSelf: "center" }}
      />
    </AppBar>
  );
}

export default BottomNavigation;

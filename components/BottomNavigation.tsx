import { AppBar, IconButton, FAB } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../constants";

function BottomNavigation() {
  const navigation = useNavigation();

  return (
    <AppBar
      color="#fff"
      leading={(props) => (
        <IconButton
          icon={(props) => <Icon name="menu" {...props} />}
          {...props}
        />
      )}
      trailing={(props) => (
        <IconButton
          onPress={() => navigation.navigate(Routes.NotesList)}
          icon={(props) => <Icon name="magnify" {...props} />}
          {...props}
        />
      )}
      style={{ position: "absolute", start: 0, end: 0, bottom: 0 }}
    />
  );
}

export default BottomNavigation;

import { AppBar, IconButton, FAB, Avatar } from "@react-native-material/core";
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
          icon={<Avatar color="#257e81" label="Yaman KATBY" size={28} />}
          onPress={() => null}
          {...props}
        />
      )}
      style={{ position: "absolute", start: 0, end: 0, bottom: 0 }}
    />
  );
}

export default BottomNavigation;

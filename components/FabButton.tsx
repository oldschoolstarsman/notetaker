import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { GlobalStyles } from "../constants";

function FabButton({ action, iconName, position }) {
  return (
    <RNBounceable
      onPress={action}
      style={{
        width: 56,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 100,
        backgroundColor: GlobalStyles.colors.lighterDark,
        bottom: 24,
        right: 24,
        position: "absolute",
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2,
        elevation: 6,
        ...position,
      }}
    >
      <Icon color="white" size={24} name={iconName} />
    </RNBounceable>
  );
}

export default FabButton;

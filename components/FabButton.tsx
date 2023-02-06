import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import RNBounceable from "@freakycoder/react-native-bounceable";

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
        backgroundColor: "black",
        bottom: 24,
        right: 24,
        position: "absolute",
        ...position,
      }}
    >
      <Icon color="white" size={24} name={iconName} />
    </RNBounceable>
  );
}

export default FabButton;

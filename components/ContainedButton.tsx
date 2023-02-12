import { Pressable, Text } from "react-native";
import { GlobalStyles } from "../constants";

const ContainedButton = ({ action, label, backgroundColor, textColor }) => {
  return (
    <Pressable
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        backgroundColor: backgroundColor,
        borderColor: GlobalStyles.colors.black,
        borderWidth: 1,
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2,
        elevation: 6,
      }}
      onPress={action}
    >
      <Text style={{ fontWeight: "bold", color: textColor }}>{label}</Text>
    </Pressable>
  );
};

export default ContainedButton;

import { PressableProps } from "@react-native-material/core";
import { Pressable, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../constants";

type ButtonProps = {
  label: string;
  variant: "primary" | "secondary";
  action: () => void;
} & PressableProps;

const Button: React.FC<ButtonProps> = ({
  label,
  variant,
  action,
  disabled,
}) => {
  return (
    <Pressable
      disabled={disabled}
      pressEffect="none"
      style={[
        styles.button,
        {
          backgroundColor:
            variant === "primary"
              ? GlobalStyles.colors.lighterDark
              : GlobalStyles.colors.yellow,
          borderColor:
            variant === "secondary" && GlobalStyles.colors.lighterDark,
        },
      ]}
      onPress={action}
    >
      <Text
        style={[
          styles.btnText,
          {
            color: disabled
              ? GlobalStyles.colors.darkGrey
              : variant === "primary"
              ? GlobalStyles.colors.white
              : GlobalStyles.colors.lighterDark,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    width: 150,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 0.5,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1,
    elevation: 3,
  },
  btnText: {
    fontWeight: "bold",
    fontFamily: "nunito",
  },
});

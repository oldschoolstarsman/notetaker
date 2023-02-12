import { useState } from "react";
import { Pressable, StyleSheet, TextInput, Text, View } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { GlobalStyles, Routes } from "../constants";
import { VStack } from "@react-native-material/core";
import { HelperText } from "react-native-paper";
import { validateEmail } from "../utils/helpers";

const auth = getAuth();

function SignUpScreen({ navigation }) {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });

  async function handleSignUp() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    } else if (!validateEmail(value.email)) {
      setValue({
        email: "",
        password: "",
        error: "Please enter valid email",
      });
      return;
    } else if (value.password.length < 6) {
      setValue({
        ...value,
        password: "",
        error: "Password must contain at least 6 characters, you can do it!",
      });
      return;
    }
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <View style={styles.container}>
      <VStack fill spacing={25} center justify="center">
        <TextInput
          onFocus={() =>
            Boolean(value.error) ? setValue({ ...value, email: "" }) : undefined
          }
          style={styles.input}
          placeholder="Email"
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
        />

        <TextInput
          onFocus={() =>
            Boolean(value.error)
              ? setValue({ ...value, password: "" })
              : undefined
          }
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
        />
        <HelperText type="error" visible={Boolean(value.error)}>
          {value.error}
        </HelperText>
        <Pressable
          pressEffect="none"
          style={{
            alignItems: "center",
            width: 150,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 16,
            backgroundColor: GlobalStyles.colors.lighterDark,
            borderColor: GlobalStyles.colors.lighterDark,
            borderWidth: 0.5,
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.22,
            shadowRadius: 1,
            elevation: 3,
          }}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Sign me up!</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(Routes.LogIn)}>
          <Text style={{ textDecorationLine: "underline" }}>
            I already have an account, go back to login screen
          </Text>
        </Pressable>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderColor: GlobalStyles.colors.lightGrey,
    borderRadius: 16,
    paddingVertical: 22,
    paddingHorizontal: 12,
    backgroundColor: "rgb(247, 249, 250)",
    fontFamily: "nunito",
    width: 300,
  },
  buttonText: {
    color: GlobalStyles.colors.white,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default SignUpScreen;

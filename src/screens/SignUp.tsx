import { useState } from "react";
import { Pressable, StyleSheet, TextInput, Text, View } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { GlobalStyles, Routes } from "../constants";
import { VStack } from "@react-native-material/core";
import { HelperText } from "react-native-paper";
import { validateEmail } from "../utils/helpers";
import Button from "../components/Button";
import { auth } from "../config/firebase-config";

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
      return user;
    } catch (error) {
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
          style={styles.input}
          placeholder="Email"
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
        />
        <HelperText type="error" visible={Boolean(value.error)}>
          {value.error}
        </HelperText>
        <Button label="Register" action={handleSignUp} variant="primary" />
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

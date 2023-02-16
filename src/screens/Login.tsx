import { useState } from "react";
import { Pressable, StyleSheet, TextInput, Text, View } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GlobalStyles, Routes } from "../constants";
import { VStack } from "@react-native-material/core";
import { HelperText } from "react-native-paper";
import { validateEmail } from "../utils/helpers";
import Button from "../components/Button";

const auth = getAuth();

function LoginScreen({ navigation }) {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });

  async function login() {
    if (value.email === "") {
      setValue({
        ...value,
        error: "Your email is needed!",
      });
      return;
    } else if (!validateEmail(value.email)) {
      setValue({
        ...value,
        error: "Please enter valid email",
      });
      return;
    } else if (value.password === "") {
      setValue({
        ...value,
        error: "Your password is needed!",
      });
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
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
        <HelperText type="error" visible={true}>
          {value.error}
        </HelperText>
        <Button action={login} variant="primary" label="Sign in" />
        <Pressable
          style={{ marginTop: 12 }}
          onPress={() => navigation.navigate(Routes.SignUp)}
        >
          <Text style={{ textDecorationLine: "underline" }}>
            I don't have an account yet, sign up now
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

export default LoginScreen;

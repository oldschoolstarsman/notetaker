import { useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, TextInput, Text, View } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GlobalStyles, Routes } from "../constants";
import { VStack } from "@react-native-material/core";
import { HelperText } from "react-native-paper";
import { validateEmail } from "../utils/helpers";

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
          onPress={login}
        >
          <Text style={styles.buttonText}>Log me in!</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(Routes.SignUp)}>
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

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  Keyboard,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmail,
  setPassword,
  loginFunction,
  setIsUser,
  resetError,
} from "../features/authenticate/authenticationSlice";
import checkEmailValid from "../utils/checkEmailValid";

//so?

const LoginScreen = ({ navigation }) => {
  const { login, loginErrors } = useSelector((store) => store.authentication);

  const { email, password, disableBtn } = login;

  const dispatch = useDispatch();

  console.log(login);

  const handleLogin = () => {
    const checkEmail = checkEmailValid(email);
    if (checkEmail === "all good") {
      //send req to server
      dispatch(loginFunction({ email, password }));
      Keyboard.dismiss();
      // handle login logic here
    }
  };

  const switchScreen = () => {
    // console.log(isUser);
    dispatch(setIsUser());
  };

  const forgotPassword = () => {
    navigation.navigate("forgotPassowrd");
  };

  return (
    <View style={styles.outerContainer}>
      {/* <ScrollView> */}
      <View style={styles.innerContainer}>
        <Text style={styles.logo}>شغلات</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="البريد الالكتروني"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => {
                dispatch(setEmail(text));
                dispatch(resetError());
              }}
              value={email}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="رمز الدخول"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(text) => {
                dispatch(setPassword(text));
                dispatch(resetError());
              }}
              value={password}
            />
          </View>
        </View>

        {/* errors */}
        <View>
          <Text style={styles.error}>{loginErrors.emailError}</Text>
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}
          disabled={disableBtn}
        >
          <Text style={styles.loginText}>تسجيل الدخول</Text>
        </TouchableOpacity>

        {/* forgot password block */}
        <View style={styles.forgotPasswordBlock}>
          <Text style={{ color: "#393232" }}> نسيت الرمز السري؟</Text>
          <TouchableOpacity style={styles.signupBtn} onPress={forgotPassword}>
            <Text style={styles.signupText}>اضغط هنا</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupBlock}>
          <Text>ليس لديك حساب؟</Text>
          <TouchableOpacity style={styles.signupBtn} onPress={switchScreen}>
            <Text style={styles.signupText}>قم بالتسجيل</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 32,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputContainer: {
    width: "80%",
    borderRadius: 16,
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  inputView: {
    flex: 1,
    borderRadius: 16,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
    elevation: 2,
    overflow: "hidden",
  },
  inputText: {
    height: 50,
    color: "black",
    textAlign: "right",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  signupBlock: { marginTop: 150 },
  signupBtn: {
    // width: "80%",
    // color: "black",
    // marginTop: 16,
  },

  loginText: {
    color: "white",
  },
  signupText: {
    color: "blue",
    fontSize: 18,
    textAlign: "center",
  },
  forgotPasswordBlock: {
    marginTop: 18,
  },
  error: {
    color: "red",
    fontSize: 20,
  },
});

export default LoginScreen;

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setName,
  setLastName,
  setPassword,
  setPasswordConfirm,
  setIsUser,
  signupFunction,
} from "../features/authenticate/authenticationSlice";
import validatePassword from "../utils/validatePassword";

const SignupScreen = ({ navigation }) => {
  const { isUser, login } = useSelector((store) => store.authentication);

  const dispatch = useDispatch();

  const { name, lastName, email, password, passwordConfirm } = login;

  const handleSignup = () => {
    if (validatePassword(password) && validatePassword(passwordConfirm)) {
      // handle signup logic here
      dispatch(
        signupFunction({
          state: { name, lastName, email, password, passwordConfirm },
          navigation: navigation,
        })
      );
    } else {
      return Alert.alert(
        "تحذير",
        "يجب ان يحتوي الرمز السري على (حرف كبير واحد ورقم واحد) على الاقل ,ويكون اكثر او يساوي 10 عناصر "
      );
    }
  };

  const switchScreen = () => {
    console.log(isUser);
    dispatch(setIsUser());
  };

  console.log(login);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>شغلات</Text>
      <View style={styles.outerInputViewContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="الاسم الاول"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => dispatch(setName(text))}
            value={name}
          />
        </View>
      </View>
      <View style={styles.outerInputViewContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="الاسم الثاني (الاب او العائلة) "
            placeholderTextColor="#003f5c"
            onChangeText={(text) => dispatch(setLastName(text))}
            value={lastName}
          />
        </View>
      </View>
      <View style={styles.outerInputViewContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="البريد الالكتروني"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => dispatch(setEmail(text))}
            value={email}
          />
        </View>
      </View>
      <View style={styles.outerInputViewContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="الرمز السري"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(text) => dispatch(setPassword(text))}
            value={password}
          />
        </View>
      </View>
      <View style={styles.outerInputViewContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="تأكيد الرمز السري"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(text) => dispatch(setPasswordConfirm(text))}
            value={passwordConfirm}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
        <Text style={styles.signupText}>تسجيل عضو جديد</Text>
      </TouchableOpacity>
      <View style={styles.signupBlock}>
        <Text>لديك حساب بالفعل؟</Text>
        <TouchableOpacity style={styles.loginText} onPress={switchScreen}>
          <Text style={styles.loginText}>قم بتسجيل الدخول</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 32,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  outerInputViewContainer: {
    width: "80%",
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  inputView: {
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
    elevation: 5,
    overflow: "hidden",
  },
  inputText: {
    height: 50,
    color: "black",
    textAlign: "right",
  },

  signupBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  signupBlock: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  loginText: {
    color: "blue",
    // textAlign: "center",
    marginTop: 4,
    fontSize: 18,
  },
});

export default SignupScreen;

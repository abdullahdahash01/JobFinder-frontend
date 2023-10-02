import { Alert } from "react-native";
import validator from "validator";

const checkEmailValid = (email) => {
  if (validator.isEmail(email)) {
    return "all good";
  } else {
    Alert.alert("تحذير", "يرجى ادخال البريد الالكتروني بشكل صحيح");
  }
};

export default checkEmailValid;

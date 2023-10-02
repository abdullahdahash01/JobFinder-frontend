import { Alert } from "react-native";

export const checkRequiredFieldsAndSendPostReq = (state) => {
  // console.log(state);

  const { title, description, qualifications, city, contact } = state;

  if (
    !title ||
    description.length < 1 ||
    qualifications.length < 1 ||
    !city ||
    !contact
  ) {
    Alert.alert("تحذير", "الحقول الحمراء يجب ان لا تكون فارغة");
    return;
  } else {
    // console.log("all good");
    return "all good";
  }
};

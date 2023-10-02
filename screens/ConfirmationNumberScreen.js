import { View, StyleSheet, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import SingleInput from "../components/SingleInput";
import {
  resetPassword,
  setField,
} from "../features/authenticate/forgotPasswordSlice";
import validatePassword from "../utils/validatePassword";

function ConfirmationNumberScreen({ navigation }) {
  const { confirmationNumber, newPassword, newPasswordConfirmation } =
    useSelector((store) => store.forgotPassword);

  const dispatch = useDispatch();

  const handleConfirmationNumber = () => {
    if (!newPassword || !newPasswordConfirmation || !confirmationNumber) {
      return Alert.alert("تحذير", "يرجى ادخال جميع الحقول");
    } else if (
      validatePassword(newPassword) &&
      validatePassword(newPasswordConfirmation)
    ) {
      dispatch(
        resetPassword({
          confirmationNumber,
          newPassword,
          newPasswordConfirmation,
          navigation,
        })
      );
    } else {
      return Alert.alert(
        "تحذير",
        "يجب ان يحتوي الرمز السري على (حرف كبير واحد ورقم واحد) على الاقل ,ويكون اكثر او يساوي 10 عناصر "
      );
    }
  };

  return (
    <View style={styles.contianer}>
      <SingleInput
        label="ادخل الرمز الذي استلمته عن طريق بريدك الالكتروني"
        onChangeHandler={(text) =>
          dispatch(setField({ field: "confirmationNumber", value: text }))
        }
        state={confirmationNumber}
      />
      <SingleInput
        label="ادخل الرمز السري الجديد"
        onChangeHandler={(text) =>
          dispatch(setField({ field: "newPassword", value: text }))
        }
        state={newPassword}
        isPassword={true}
      />
      <SingleInput
        label="تأكيد الرمز السري"
        onChangeHandler={(text) =>
          dispatch(setField({ field: "newPasswordConfirmation", value: text }))
        }
        state={newPasswordConfirmation}
        isPassword={true}
      />
      <View style={styles.btnContainer}>
        <Button title="ارسل" onPress={handleConfirmationNumber} />
      </View>
    </View>
  );
}

export default ConfirmationNumberScreen;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    margin: 16,
  },
  btnContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
});

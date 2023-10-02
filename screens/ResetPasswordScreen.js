import { View, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import SingleInput from "../components/SingleInput";

function ResetPasswordScreen() {
  const { newPassword, newPasswordConfirmation } = useSelector(
    (store) => store.forgotPassword
  );

  const dispatch = useDispatch();

  const handleResetPassword = () => {
    // dispatch()
  };

  return (
    <View style={styles.contianer}>
      <SingleInput
        label="ادخل الرمز السري الجديد"
        onChangeHandler={(text) =>
          dispatch(setField({ field: "newPassword", value: text }))
        }
        state={newPassword}
      />
      <SingleInput
        label="تأكيد الرمز السري"
        onChangeHandler={(text) =>
          dispatch(setField({ field: "newPasswordConfirmation", value: text }))
        }
        state={newPasswordConfirmation}
      />
      <View style={styles.btnContainer}>
        <Button title="ارسل" onPress={handleResetPassword} />
      </View>
    </View>
  );
}
export default ResetPasswordScreen;

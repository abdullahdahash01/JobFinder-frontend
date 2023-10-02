import { Button, View, StyleSheet, Alert, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SingleInput from "../components/SingleInput";
import {
  setField,
  forgotPasswordFun,
} from "../features/authenticate/forgotPasswordSlice";

const ForgotPassowrd = ({ navigation }) => {
  const { email, alerts } = useSelector((store) => store.forgotPassword);
  const dispatch = useDispatch();

  const handleSendEmail = () => {
    // check response from server
    // if OK, navigate to input confirmation number (which will be generated on the USER in Db)
    //if NOT OK, will retun and alert that the your email is not correct
    //when navigationg, we gonna need the user to send the correct confirmation number, and will wait for server response. if server response is OK, we gonna navigate to set password page. if server response is NOT OK, we gonna alert user that confirmation number is not correct
    // user have 2 min to check email and send the confirmation number
    //

    dispatch(forgotPasswordFun({ email, navigation: navigation }));
  };

  return (
    <View style={styles.contianer}>
      <SingleInput
        label="البريد الالكتروني الخاص بك"
        onChangeHandler={(text) =>
          dispatch(setField({ field: "email", value: text }))
        }
        state={email}
      />
      <View style={styles.btnContainer}>
        <Button title="ارسل" onPress={handleSendEmail} />
      </View>
    </View>
  );
};

export default ForgotPassowrd;

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

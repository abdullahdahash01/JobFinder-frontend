import { useEffect } from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import SingleInput from "../components/SingleInput";
import { setField } from "../features/authenticate/userSlice";
import { getMe, updateUser } from "../features/authenticate/userSlice";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const { name, lastName, email, password, passwordConfirm } = useSelector(
    (store) => store.user
  );
  const {
    login: { token },
  } = useSelector((store) => store.authentication);

  // console.log(user);

  useEffect(() => {
    dispatch(getMe(token));
  }, []);

  const handler = () => {
    dispatch(updateUser({ token: token, data: { email, name, lastName } }));
  };

  return (
    <ScrollView style={styles.container}>
      <SingleInput
        label="الاسم"
        onChangeHandler={(text) =>
          dispatch(setField({ field: "name", value: text }))
        }
        state={name}
      />
      <SingleInput
        label="الاسم الثاني (اسم الاب او العائلة)"
        onChangeHandler={(text) =>
          dispatch(setField({ field: "lastName", value: text }))
        }
        state={lastName}
      />
      <SingleInput
        label="البريد الالكتروني"
        onChangeHandler={(text) =>
          dispatch(setField({ field: "email", value: text }))
        }
        state={email}
      />
      {/* <SingleInput
        isPassword={true}
        label="الرمز السري الحالي"
        onChangeHandler={(text) =>
          dispatch(setField({ field: "password", value: text }))
        }
        state={password}
      />
      <SingleInput
        isPassword={true}
        label="الرمز السري الجديد"
        onChangeHandler={(text) =>
          dispatch(setField({ field: "password", value: text }))
        }
        state={password}
      />
      <SingleInput
        isPassword={true}
        label="تأكيد الرمز السري الجديد"
        onChangeHandler={(text) =>
          dispatch(setField({ field: "passwordConfirm", value: text }))
        }
        state={passwordConfirm}
      /> */}
      <View style={styles.btnContainer}>
        <Button style={styles.btn} title="تعديل البيانات" onPress={handler} />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  btnContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  btn: {
    width: "80%",
  },
});

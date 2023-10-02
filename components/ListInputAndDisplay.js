import {
  Text,
  View,
  TextInput,
  Keyboard,
  StyleSheet,
  Button,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDescription, deleteDescription } from "../features/jobs/adminSlice";
import { fontSize } from "./../constants/styleObj";
import { color } from "react-native-reanimated";

const ListInputAndDisplay = ({ label, list, field, borderStyle }) => {
  const adminState = useSelector((store) => store.admin);

  const [val, setVal] = useState("");

  const dispatch = useDispatch();

  const onDescriptHandler = () => {
    let trimmedVal = val.trim();
    if (!trimmedVal) {
      Keyboard.dismiss();
    } else {
      dispatch(setDescription({ value: trimmedVal, field }));
      setVal("");
    }
  };

  const onVal = (text) => {
    setVal(text);
  };

  return (
    <View style={styles.innerContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.note}>
          (اضغط ادخال على لوحة المفاتيح لاضافة النص كنقطة)
        </Text>
      </View>
      <TextInput
        style={[styles.input, borderStyle]}
        returnKeyType="done"
        enablesReturnKeyAutomatically={true}
        textAlign="right"
        textAlignVertical="center"
        placeholder="أدخل النص هنا..."
        onSubmitEditing={onDescriptHandler}
        value={val}
        onChangeText={onVal}
        autoCorrect={false}
      />
      <View style={styles.box}>
        {list.map((item) => {
          return (
            <View key={item.id} style={styles.innerBox}>
              <Text style={styles.value}>- {item.value}</Text>
              <View style={styles.btnContainer}>
                <Button
                  title="مسح"
                  onPress={() =>
                    dispatch(deleteDescription({ id: item.id, field }))
                  }
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ListInputAndDisplay;

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "row-reverse",
    alignItems: "baseline",
  },
  label: {
    marginBottom: 8,
    marginLeft: 4,
    fontSize: fontSize.normal,
    fontWeight: "bold",
  },
  note: {
    fontSize: 12,
  },
  innerContainer: {
    // marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  box: {
    margin: 8,
  },
  innerBox: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  value: {
    flexShrink: 1,
  },
  btnContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
});

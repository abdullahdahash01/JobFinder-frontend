import { View, Text, TextInput, StyleSheet } from "react-native";
import { fontSize } from "./../constants/styleObj";

const SingleInput = ({
  label,
  onChangeHandler,
  state,
  borderStyle,
  isPassword,
}) => {
  return (
    <View style={styles.innerContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        secureTextEntry={isPassword}
        style={[styles.input, borderStyle]}
        returnKeyType="done"
        enablesReturnKeyAutomatically={true}
        textAlign="right"
        textAlignVertical="center"
        placeholder="أدخل النص هنا..."
        value={state}
        autoCorrect={false}
        onChangeText={onChangeHandler}
      />
    </View>
  );
};

export default SingleInput;

const styles = StyleSheet.create({
  innerContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: fontSize.normal,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

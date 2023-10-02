import { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import {
  setTitle,
  setCity,
  setContact,
  setSalary,
  createJob,
} from "../features/jobs/adminSlice";

import ListInputAndDisplay from "../components/ListInputAndDisplay";
import { checkRequiredFieldsAndSendPostReq } from "../utils/checkEmptyFields";
import SingleInput from "../components/SingleInput";

const AdminScreen = () => {
  const adminState = useSelector((store) => store.admin);
  const {
    description,
    youDo,
    qualifications,
    niceToHave,
    title,
    city,
    salary,
    contact,
  } = adminState;

  const dispatch = useDispatch();

  const titleHandler = (text) => {
    dispatch(setTitle(text));
  };

  const cityHandler = (text) => {
    dispatch(setCity(text));
  };

  const contactHandler = (text) => {
    dispatch(setContact(text));
  };
  const salaryHandler = (text) => {
    dispatch(setSalary(text));
  };

  const onSendHandler = () => {
    //check the state and show alerts if something is missing
    const checked = checkRequiredFieldsAndSendPostReq(adminState);
    console.log(checked);
    if (checked === "all good") {
      dispatch(createJob(adminState));
    }
    //send to the API
    // await getAllJobs();
  };

  return (
    <ScrollView
      style={styles.outerContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.note}>
        * الحقول باللون الاحمر يجب ان لا تكون فارغة
      </Text>
      <SingleInput
        label="اسم الوظيفة"
        onChangeHandler={titleHandler}
        state={title}
        borderStyle={{ borderColor: "red" }}
      />
      <ListInputAndDisplay
        label="تفاصيل العمل"
        list={description}
        field="description"
        borderStyle={{ borderColor: "red" }}
      />
      <ListInputAndDisplay
        label="المؤهلات"
        list={qualifications}
        field="qualifications"
        borderStyle={{ borderColor: "red" }}
      />
      <ListInputAndDisplay
        label="يفضل ان يعرف"
        list={niceToHave}
        field="niceToHave"
      />

      <ListInputAndDisplay
        label="المهام التي ستقوم بها"
        list={youDo}
        field="youDo"
      />
      <SingleInput
        label="الراتب"
        onChangeHandler={salaryHandler}
        state={salary}
      />
      <SingleInput
        label="المدينة"
        onChangeHandler={cityHandler}
        state={city}
        borderStyle={{ borderColor: "red" }}
      />
      <SingleInput
        label="التواصل"
        onChangeHandler={contactHandler}
        state={contact}
        borderStyle={{ borderColor: "red" }}
      />
      <View style={styles.btnContainer}>
        <Button style={styles.sendBtn} title="ارسال" onPress={onSendHandler} />
      </View>
    </ScrollView>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    margin: 20,
  },
  note: {
    marginBottom: 20,
    color: "red",
    fontSize: 12,
    fontWeight: "bold",
  },
  btnContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
});

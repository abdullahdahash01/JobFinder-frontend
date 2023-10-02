import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs } from "../features/jobs/jobsSlice";
import React from "react";

import { data } from "../data";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";

const HomeScreen = () => {
  const jobsState = useSelector((store) => store.jobs);
  const admin = useSelector((store) => store.admin);
  const {
    login: { token },
  } = useSelector((store) => store.authentication);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  //when component mount and JOBS changes
  useEffect(() => {
    dispatch(fetchJobs({ token, searchValue: "" }));
  }, [admin.change]);

  // console.log(jobsState.jobs);
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    dispatch(fetchJobs({ token, searchValue: search }));
  };
  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder=" بحث "
          style={styles.input}
          textAlign="right"
          onSubmitEditing={handleSearch}
          value={search}
          onChange={({ nativeEvent: { text } }) => {
            console.log(text);
            setSearch(text);
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="ابحث" onPress={handleSearch} color="#00bf69" />
      </View>
      <FlatList
        style={styles.list}
        data={jobsState.jobs}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
  },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    color: "green",
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  list: {
    height: "105%",
  },
});

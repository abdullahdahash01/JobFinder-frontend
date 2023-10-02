import { useEffect, useState } from "react";
import { View, FlatList, Text, RefreshControl, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/Card";
import { getMeFav } from "../features/jobs/favoriteJobsSlice";

const FavoriteScreen = () => {
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const {
    favoriteJobs,
    login: { token },
  } = useSelector((store) => store.authentication);

  const { jobs } = useSelector((store) => store.favoriteJobs);

  console.log(jobs);

  useEffect(() => {
    console.log("sending get");
    dispatch(getMeFav(token));
  }, [favoriteJobs]);

  const pullToRefresh = () => {
    setRefreshing(true);

    dispatch(getMeFav(token));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  if (jobs.length < 1) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={pullToRefresh} />
        }
      >
        <View style={styles.container}>
          <Text style={styles.text}>لم يتم اضافة اي وظائف</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={pullToRefresh} />
      }
      data={jobs}
      renderItem={({ item }) => <Card item={item} />}
      keyExtractor={(item) => item._id}
    />
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  text: {
    fontSize: 24,
  },
});

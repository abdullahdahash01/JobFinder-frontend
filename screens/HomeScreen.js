import { View, Text, StyleSheet, FlatList } from "react-native";
import { data } from "../data";
import Card from "../components/Card";

const HomeScreen = () => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create();

import { Text, View, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons/";
import { fontSize } from "../constants/styleObj";
import { useNavigation } from "@react-navigation/native";

const Card = ({ item }) => {
  const {
    title,
    description,
    qualifications,
    niceToHave,
    city,
    contact,
    whatYouWillDo,
  } = item;

  const navigation = useNavigation();

  const onPressHandler = () => {
    navigation.navigate("job", {
      screen: "jobOverview",
      params: {
        title,
        description,
        qualifications,
        niceToHave,
        city,
        contact,
        whatYouWillDo,
      },
    });
  };

  return (
    <Pressable onPress={onPressHandler}>
      <View style={styles.outer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.city}>{city}</Text>
            <View style={styles.DescriptionLeft}>
              <Text style={styles.detailsText}>اضغط للتفاصيل</Text>
              <AntDesign name="leftcircleo" size={24} color="black" />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    height: 100,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 16,
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    padding: 16,
  },

  title: {
    fontSize: fontSize.header,
    fontWeight: "bold",
  },
  city: {
    marginTop: 16,
    fontSize: fontSize.normal,
  },
  detailsText: {
    fontSize: fontSize.normal,
    marginHorizontal: 8,
  },

  descriptionContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  DescriptionLeft: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

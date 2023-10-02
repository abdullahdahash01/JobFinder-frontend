import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { store } from "./store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import JobOverview from "./screens/JobOverview";
import AdminScreen from "./screens/AdminScreen";
import LoginScreen from "./screens/LoginScreen";
import moment from "moment";
import "moment/min/moment-with-locales";

import { useEffect, useState } from "react";
import SignupScreen from "./screens/SignupScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import {
  addFavJob,
  removeFavJob,
} from "./features/authenticate/authenticationSlice";
import { updateUserFav } from "./features/jobs/favoriteJobsSlice";
import ForgotPassowrd from "./screens/ForgotPassword";
import ConfirmationNumberScreen from "./screens/ConfirmationNumberScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import AboutScreen from "./screens/AboutScreen";
import HelpScreen from "./screens/HelpScreen";
import SubscriptonScreen from "./screens/SubscribeScreen";
import { Header, Icon, Input, Search } from "react-native-elements";
import { fetchJobs } from "./features/jobs/jobsSlice";

import { SearchBar } from "@rneui/themed";

import * as Linking from "expo-linking";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const JobDetailsStackNavigator = ({ navigation, route }) => {
  //job details
  // console.log(route.params.params._id);

  // const [one, setOne] = useState(false);
  const dispatch = useDispatch();

  const {
    favoriteJobs,
    login: { name, lastName, email, token },
  } = useSelector((store) => store.authentication);

  console.log(favoriteJobs);

  const { _id } = route.params.params;

  const checkItemAval = (id) => {
    return favoriteJobs.includes(id);
  };

  useEffect(() => {
    console.log("executing....");
    dispatch(
      updateUserFav({
        token: token,
        data: { name, lastName, email: email.toLowerCase(), favoriteJobs },
      })
    );
  }, [favoriteJobs]);

  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="jobOverview"
        component={JobOverview}
        options={{
          title: "التفاصيل",
          // headerTitleStyle: { fontWeight: "bold" },

          headerRight: () => (
            <AntDesign
              name={checkItemAval(_id) ? "star" : "staro"}
              size={24}
              color="orange"
              onPress={() => {
                dispatch(
                  checkItemAval(_id) ? removeFavJob(_id) : addFavJob(_id)
                );
                console.log("hay fav jobs " + favoriteJobs);
              }}
            />
          ),

          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              onPress={() => {
                // navigate back to the previous screen
                navigation.goBack();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  //search bar implentation
  const {
    login: { role, token },
  } = useSelector((store) => store.authentication);

  const dispatch = useDispatch();

  const MyHeader = ({ navigation }) => {
    return (
      <Header
        backgroundColor="#fff"
        leftComponent={
          <Icon
            name="menu"
            onPress={() => navigation.toggleDrawer()}
            centerContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        }
        // centerComponent={
        //   <Input
        //     placeholder=" بحث "
        //     inputStyle={{ textAlign: "right", color: "#000" }}
        //     containerStyle={{
        //       backgroundColor: "#fff",
        //       borderBottomWidth: 0,
        //       borderTopWidth: 0,
        //       width: "100%",
        //       margin: 0,
        //     }}
        //     inputContainerStyle={{
        //       borderRadius: 10,
        //       margin: 0,
        //     }}
        //     onSubmitEditing={handleSearch}
        //     value={search}
        //     onChangeText={(text) => {
        //       setSearch(text);
        //     }}
        //   />
        // }
        // centerComponent={
        //   <SearchBar
        //     lightTheme={true}
        //     round={true}
        //     inputStyle={{  }}
        //   />
        // }
        // rightComponent={}
        containerStyle={{ height: 80, marginTop: 10, padding: 0 }}
        centerContainerStyle={{
          justifyContent: "center",
          alignItems: "baseline",
        }}
      />
    );
  };

  const prefix = Linking.makeUrl("/");

  const linking = {
    prefix: [prefix],
    config: {
      screens: {
        Profile: "profile",
        Favorites: "favorites",
      },
    },
  };

  return (
    <Drawer.Navigator
      linking={linking}
      screenOptions={{
        // drawerPosition: "right",
        headerTitleAlign: "center",

        drawerType: "back",
        drawerLabelStyle: { fontSize: 18, fontWeight: "bold" },
        // headerStyle: { backgroundColor: "yellow" },
        // sceneContainerStyle: { backgroundColor: "#c6cbef" },

        // drawerActiveTintColor: "red",
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          // headerTitleAlign: "right",
          title: "جميع الوظائف",
          // header: (props) => <MyHeader {...props} />,
        }}
        component={HomeScreen}
      />
      <Drawer.Screen
        name="profile"
        component={ProfileScreen}
        options={{ title: "الصفحة الشخصية" }}
      />

      <Drawer.Screen
        name="job"
        component={JobDetailsStackNavigator}
        options={{
          drawerVisible: false, // hide the screen
          drawerLabel: () => null, // hide the label
          drawerItemStyle: { height: 0 },
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="favorites"
        component={FavoriteScreen}
        options={{ title: "الوظائف المفضلة" }}
      />

      <Drawer.Screen name="الاشتراك" component={SubscriptonScreen} />
      <Drawer.Screen name="تواصل معنا" component={HelpScreen} />
      <Drawer.Screen name="عن التطبيق" component={AboutScreen} />
      {/* <Drawer.Screen name='job tracking' component={} /> */}
      {/* <Drawer.Screen name='applied jobs screen' component={} /> */}
      {role === "admin" ? (
        <Drawer.Screen
          name="admin"
          options={{ title: "صفحة الادمن" }}
          component={AdminScreen}
        />
      ) : null}
    </Drawer.Navigator>
  );
};

const Authentication = () => {
  const { isUser } = useSelector((store) => store.authentication);

  const user = isUser ? (
    <Stack.Screen
      name="login"
      component={LoginScreen}
      options={{
        title: "تسجيل الدخول",
        headerTitleAlign: "center",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    />
  ) : (
    <Stack.Screen
      name="signup"
      component={SignupScreen}
      options={{
        title: "التسجيل",
        headerTitleStyle: { fontWeight: "bold" },
        headerTitleAlign: "center",
      }}
    />
  );

  return (
    <Stack.Navigator>
      {/* {user} */}
      {isUser ? (
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{
            title: "تسجيل الدخول",
            headerTitleAlign: "center",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
      ) : (
        <Stack.Screen
          name="signup"
          component={SignupScreen}
          options={{
            title: "التسجيل",
            headerTitleStyle: { fontWeight: "bold" },
            headerTitleAlign: "center",
          }}
        />
      )}
      <Stack.Screen
        name="forgotPassowrd"
        component={ForgotPassowrd}
        options={{
          title: "نسيت الرمز السري",
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name="confirmation"
        component={ConfirmationNumberScreen}
        options={{
          title: "تأكيد الرمز",
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      {/* <Stack.Screen
        name="passwordReset"
        component={ResetPasswordScreen}
        options={{
          title: "تعيين رمز جديد",
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      /> */}
    </Stack.Navigator>
  );
};

const Root = () => {
  const authentication = useSelector((store) => store.authentication);

  console.log(authentication);

  if (authentication.isAuthenticated) {
    return <DrawerNavigator />;
  } else {
    return <Authentication />;
  }
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  drawerStyle: {
    backgroundColor: "yellow",
  },
});

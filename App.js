import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { store } from "./store";
import { Provider } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import JobOverview from "./screens/JobOverview";
import { useState } from "react";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const JobDetailsStackNavigator = ({ navigation, route }) => {
  const title = route.params.title;

  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="jobOverview"
        component={JobOverview}
        options={{
          title: "Main Screen",
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

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            // drawerPosition: "right",
            headerTitleAlign: "center",
          }}
        >
          <Drawer.Screen
            name="home"
            options={{ title: "الوظائف المتاحة" }}
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
            options={{ headerShown: false }}
          />
          {/* <Drawer.Screen name='login' component={} /> */}
          {/* <Drawer.Screen name='signup' component={} /> */}
          {/* <Drawer.Screen name='favorites' component={} /> */}
          {/* <Drawer.Screen name='subscripton' component={} /> */}
          {/* <Drawer.Screen name='job tracking' component={} /> */}
          {/* <Drawer.Screen name='applied jobs screen' component={} /> */}
        </Drawer.Navigator>
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
});

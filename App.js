import React,{useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading"; // expo install expo-app-loading
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import AuthenticationStackNavigation from "./DrawerNavigation/AuthenticationStackNavigation";
import {navigationRef} from './DrawerNavigation/rootNavigationRef'
export default function App() {
 

  let [fontsLoaded] = useFonts({
    "montserrat-light": require("./assets/fonts/Montserrat-Light.ttf"),
    "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "montserrat-semiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });

  console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];

  if (!fontsLoaded) {
    return <AppLoading error={(error) => console.log("Error: ", error)} />;
  } else {
    return (
      <>
        <NavigationContainer ref={navigationRef}>
          <AuthenticationStackNavigation />
        </NavigationContainer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

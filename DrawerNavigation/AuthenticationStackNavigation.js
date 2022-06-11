import React,{useEffect, useState} from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../Screens/AuthenticationScreen/WelcomeScreen";
import LogInScreen from "../Screens/AuthenticationScreen/LoginScreen";
import RegistrationScreen from "../Screens/AuthenticationScreen/RegistrationScreen";
import DrawerScreen from "./DrawerNavigation";
import * as Notifications from 'expo-notifications'
import { useNavigation } from "@react-navigation/native";
import navigation from './rootNavigationRef'


const Stack = createStackNavigator();

const AuthenticationStackNavigation = (props) => {
//  const  navigation=useNavigation()
      // 2) using useLastNotificationResponse
      let lastNotificationResponse = Notifications.useLastNotificationResponse()
     // 1) using addNotificationResponseReceivedListener, which is triggered whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed
     useEffect(() => {
      const notificationInteractionSubscription = Notifications.addNotificationResponseReceivedListener(
        response => {
          // add the code to do what you need with the notification e.g. navigate to a specific screen
          // handleNewNotification(response.notification, () =>
          //   // navigation.navigate('NotificationList')
          //   alert("recived")
          // )

          lastNotificationResponse?.notification?.request?.content?.data?.match_id?
          navigation.navigate("Drawer Screen",{notification:lastNotificationResponse?.notification?.request?.content}):null
 
        }
      )
      // if (lastNotificationResponse) {
      //   // add the code to do what you need with the notification e.g. navigate to a specific screen
      //   // handleNewNotification(
      //   //   lastNotificationResponse.notification.request.trigger.remoteMessage,
      //   //   () => alert("last")
      //   //   // navigation.navigate('Notifications')
      //   // )
      //       alert("done")
      //       console.log(lastNotificationResponse?.notification?.request)

      // }
      return () => {
        notificationInteractionSubscription.remove()
      }
    }, [lastNotificationResponse])
  
  return (
    <Stack.Navigator initialRouteName="Welcome Screen">
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome Screen" component={WelcomeScreen} />
        <Stack.Screen name="Login Screen" component={LogInScreen} />
        <Stack.Screen name="Registration Screen" component={RegistrationScreen} />     
        <Stack.Screen name="Drawer Screen" component={DrawerScreen}  >
  
          </Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthenticationStackNavigation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

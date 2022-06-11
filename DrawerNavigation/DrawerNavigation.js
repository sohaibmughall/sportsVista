import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerMenuDetail from "./DrawerMenu";
import AcdemyScreen from "../Screens/Dashboard/AcdemyScreen";
import AcdemyDetailScreen from "../Screens/Dashboard/AcdemyDetailScreen";
import VenueScreen from "../Screens/Dashboard/VenueScreen";
import Booking from "../Screens/Dashboard/Booking";
import Home from "./../Screens/Dashboard/Home";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import * as Notifications from 'expo-notifications'
// import { useNavigation } from "@react-navigation/native";
import navigation from './rootNavigationRef'

const Drawer = createDrawerNavigator();
const DrawerScreen = (props) => {
  const {route,}=props
  const {params}=route?route:{}
  const {notification}=params?params:{}
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
            // alert("recived")
          // )
          lastNotificationResponse?.notification?.request?.content?.data?.match_id?
          navigation.navigate("Booking",{notification:lastNotificationResponse?.notification?.request?.content}):null
 
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
  const leftHeaderBack = () => {
    const navigation = useNavigation();
    return (
      <Icon.Button
        name="arrow-back-outline"
        size={25}
        color="#E60023"
        backgroundColor="#fff"
        style={{ paddingLeft: 11 }}
        onPress={() => navigation.goBack()}
      ></Icon.Button>
    );
  };
  // const ReturnBooking=()=><Booking notification={notification} />
  // const ReturnHome=()=><Home notification={notification}  />
  return (
    <>
      <Drawer.Navigator
        initialRouteName={"Home Screen"}
        screenOptions={{
          headerTitle: "",
          drawerStyle: {
            backgroundColor: "#2d415a",
            width: 220,
          },
        }}
        drawerContent={() => <DrawerMenuDetail {...props} />}
      >
        <Drawer.Screen name="Home Screen" component={Home} />
        <Drawer.Screen name="Venue Screen" component={VenueScreen} />
        <Drawer.Screen name="Academy Screen" component={AcdemyScreen} />
        <Drawer.Screen
          name="Booking"
          component={Booking}
          options={{
            headerTitle: "Booking",
            headerLeft: () => leftHeaderBack(),
          }}
        />
        <Drawer.Group
          screenOptions={{
            //disabling drawer header
            headerShown: false,
          }}
        >
          <Drawer.Screen
            name="Acdemy Detail Screen"
            component={AcdemyDetailScreen}
          />
        </Drawer.Group>
      </Drawer.Navigator>
    </>
  );
};
export default DrawerScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 80,
  },
});

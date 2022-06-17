import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Avatar } from "react-native-paper";
import { getAuth } from "firebase/auth";
import { Icon } from 'react-native-elements'
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";


const DrawerMenuDetail = (props) => {

  const auth = getAuth()
  const user = auth.currentUser

  return (
    <DrawerContentScrollView contentContainerStyle={styles.drawerContainer}>
      <View>
        <View style={styles.profileContainer}>
          <Avatar.Image
            source={{
              uri: "https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg",
            }}
            size={80}
          />
          <Text style={styles.profileTextStyle}>
            {user.providerData[0].email}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Venue Screen");
            }}
            style={styles.drawerTabContainer}
          >
            <MaterialCommunityIcons
              name="map"
              size={25}
              color={"white"}
            />
            <Text style={styles.drawerTextStyle}>Venue Screen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Academy Screen");
            }}
            style={styles.drawerTabContainer}
          >
            <MaterialCommunityIcons
              name="home-city"
              size={24}
              color={"white"}
            />
            <Text style={styles.drawerTextStyle}>Academy Screen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Home Screen");
            }}
            style={styles.drawerTabContainer}
          >
            <MaterialCommunityIcons
              name="home"
              size={25}
              color={"white"}
            />
            <Text style={styles.drawerTextStyle}>Home Screen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Booking");
            }}
            style={styles.drawerTabContainer}
          >
            <MaterialCommunityIcons
              name="arrow-up"
              size={25}
              color={"white"}
            />
            <Text style={styles.drawerTextStyle}>Booking screen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("myBooking");
            }}
            style={styles.drawerTabContainer}
          >
            <MaterialCommunityIcons
              name="arrow-down"
              size={25}
              color={"white"}
            />
            <Text style={styles.drawerTextStyle}>My Bookings</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("myChats");
            }}
            style={styles.drawerTabContainer}
          >
            <MaterialCommunityIcons
              name="wechat"
              size={25}
              color={"white"}
            />

            <Text style={styles.drawerTextStyle}>My Chats</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Welcome Screen")}
          style={styles.logoutTextContainer}
        >
          {/* <MaterialIcons name="logout" size={24} color="black" /> */}
          <Text style={styles.logoutTextStyle}>Logout</Text>
        </TouchableOpacity>
      </View>

    </DrawerContentScrollView>
  );
};

export default DrawerMenuDetail;

const styles = StyleSheet.create({
  //Conatiner
  drawerContainer: {
    justifyContent: "space-between",
    display: "flex",
    height: "100%",
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  logoutContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  logoutTextContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  drawerTabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  dropDownTabContaineer: {
    backgroundColor: "#6cbffd",
  },
  dropDownContainerStyle: {
    justifyContent: "space-between",
  },
  //Style
  profileTextStyle: {
    fontFamily: "montserrat-medium",
    fontSize: 15,
    paddingTop: 10,
    color: "#fff",
    paddingBottom: 10,
  },
  dropDownTextStyle: {
    fontSize: 13,
  },
  drawerTextStyle: {
    paddingBottom: 3,
    fontFamily: "montserrat-regular",
    color: "#fff",
    fontSize: 15,
    paddingLeft: 15,
  },
  logoutTextStyle: {
    fontSize: 20,
    color: "black",
    fontFamily: "montserrat-regular",
    paddingBottom: 2,
    paddingLeft: 5,
  },
});

import { View, Text, Image, StyleSheet,ImageBackground, Alert } from "react-native";
import React,{useEffect, useState} from "react";
import SportsBtn from "../../components/Sportbtn";
import { windowWidth,windowHeight } from '../../src/utils';
import * as Notifications from 'expo-notifications'
import {updateSpecificUser,getSpecificUserById} from '../../src/api/usersApi'
import { getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
const auth = getAuth();
const user = auth.currentUser;
const Home = () => {
  const image = require("../../assets/backgroundone.jpg");
 let focused= useIsFocused()
  // states-------------------------------------------------------
  const [userData,setUserData]=useState(null)
  useEffect(()=>{
    registerForPushNotificationsAsync()
  },[userData])
  useEffect(()=>{
    setLoginUserData()
  },[focused])
  // set login user data in to state-------------------------------
 const setLoginUserData=async()=>{
if(user&&user.uid){
  try {
    let res=await  getSpecificUserById(user.uid)
     res?setUserData({...res})
     :Alert.alert("ERROR","SOMETHING WENT WRONG")
    return true
  } catch (error) {
     Alert.alert("ERROR","SOMETHING WENT WRONG")
     return false
  }
}
  }
  // registration fro push notification ---------------------------
  async function registerForPushNotificationsAsync() {
    if (user && user.uid) {
   try {
    let push_token
    const res = await Notifications.getPermissionsAsync()
    // console.log(res)
    const { status: existingStatus } = res
    // console.log(existingStatus)
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    push_token = (await Notifications.getExpoPushTokenAsync()).data
    // console.log(push_token)
    if (!userData||!userData.notification_token ||userData.notification_token != push_token) {
    await  updateSpecificUser(user.uid,{notification_token:push_token})
    }
    return push_token
   } catch (error) {
     return error
   }
    }
  }
  // end---------------------
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/logo2.png")}
          />
        </View>
        <View style={styles.btnContainer}>
        <View style={{ position:"absolute",top:-30,width:windowWidth/2,left:windowWidth/4 - 7,backgroundColor:"red"}}>
          <Text
            style={{ fontSize: 26, fontWeight: "bold", textAlign: "center",color:"white" }}
          >
            Game on hai!
          </Text>
        </View>
          <SportsBtn
            ImgSource={require("../../assets/cricket.png")}
            sportsName="Cricket"
          />
          <SportsBtn
            ImgSource={require("../../assets/football.png")}
            sportsName="Football"
          />
          <SportsBtn
            ImgSource={require("../../assets/basketball.png")}
            sportsName="Basketball"
          />
          <SportsBtn
            ImgSource={require("../../assets/tennis-player.png")}
            sportsName="Tennis"
          />
        </View>
        <View>
          <SportsBtn
            ImgSource={require("../../assets/vs.png")}
            sportsName="Find Match!"
          />
          </View>
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    paddingTop: 10,
  },
  image: {
    flex: 1,
    // justifyContent: "center"
  },
  btnContainer: {
    flexDirection: "row",
    marginVertical: 40,
    marginHorizontal: 5,
    paddingVertical: 25,
    paddingHorizontal: 4,
    justifyContent: "space-around",
    backgroundColor: "rgba(0,0,0,0.9)",
    borderRadius: 10,
  },
  logo: {
    width: 250,
    height: 250,
    alignSelf: "center",
  },
});

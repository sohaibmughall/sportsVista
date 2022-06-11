import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { windowWidth } from "./../../src/utils/index";
import Dropdown from "./../../assets/lib/CustomDropDown";
import { Sports } from "../../assets/data/SportCategories";
import { getVenues } from "../../src/api/venueApi";
import { getBasketballTeams } from "../../src/api/teamsApi";
import { addBooking, getBookings } from "../../src/api/bookingApi";
import { getSpecificUserById } from "../../src/api/usersApi";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getFootballTeams, getCricketTeams } from "./../../src/api/teamsApi";
import * as Notifications from 'expo-notifications';
// import Notification from '../../components/Notification/Notification'
import { getAuth } from "firebase/auth";
import { firebase } from "../../src/firebase/config";
import { ListItem } from "react-native-elements";
import MatchNotificationComponent from '../../components/Notification/MatchNotification'




const Booking = ({ route }) => {
  const { params } = route ? route : {}
  const { notification } = params ? params : {}
  const [match_notification, set_match_notification] = useState(null);
  const [selectedSport, setSport] = useState(undefined);
  const [selectedVenue, setVenue] = useState(undefined);
  const [selectedTeam, setTeam] = useState(undefined);
  const [teamList, setTeamList] = useState([]);
  const [venueList, setVenueList] = useState([{}]);
  const [bookingList, setBookingList] = useState([]);
  const [selectedIndex, setselectedIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [bookingId, setBookingId] = useState(0);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [modal, setModalShow] = useState(false);

  useEffect(() => {
    let auth = getAuth();
    let _user = auth.currentUser;
    setUser(_user)
    // console.log("sssssssss--------------------",user)

  }, [])
  useEffect(() => {
    console.log("notification--------------------", notification)
    set_match_notification(notification)
    setModalShow(notification ? true : false)
  }, [params])
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };



  const handleBooking = async () => {
    if (
      teamList
    ) {
      try {
        setLoader(true)
        // console.log("user--------------------",user)
        const team = teamList.filter(item => item.TeamName == selectedTeam)
        const getMyTeam = teamList.filter(item => item.uid == user.uid)
        const myteam = getMyTeam[0].TeamName
        const uuid = getMyTeam[0]
        const uuid2 = team[0]
        let vs = { selectedSport, selectedTeam, selectedVenue, date, uuid, myteam, uuid2 };
        // console.log(vs);
        let snapshot = await addBooking(vs);
        let match_id = snapshot.id
        let res = await firebase.firestore().collection("Matches").doc(match_id).update({ match_id })
        let notification_res = await sendNotificationToTeam(uuid2, selectedVenue, date, myteam, match_id)
        handleBookingResponse(match_id)
        setLoader(false)
      } catch (error) {
        Alert.alert("ERROR", "SOMETHING WENT WRONG ")
        setLoader(false)
      }

    }
    // setLoader(true);

    // const token = (await Notifications.getDevicePushTokenAsync()).data;
    // await fetch('https://fcm.googleapis.com/fcm/send', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `key=AAAASmsWooA:APA91bFWS27_Onid6CxQTmVWoeQfNjDWpdX6dmdFjtub_5cusybLpiEpjkcfgsf_dugT-yIKi49J2jj9GTny4Z_-Zgo3wQh92S587mFyE-0anmUB2hsedjsHhU8BHIXH6UzGahcfMBsk`,
    //   },
    //   body: JSON.stringify({
    //     to: token,
    //     priority: 'normal',
    //     data: {
    //       experienceId: '@yourExpoUsername/yourProjectSlug',
    //       scopeKey: '@yourExpoUsername/yourProjectSlug',
    //       title: "\uD83D\uDCE7 You've got mail",
    //       message: 'Hello world! \uD83C\uDF10',
    //     },
    //   }),
    // });
  };

  const handleBookingResponse = (id) => {
    setLoader(false);
    Alert.alert(
      `Match request send successfully\n match id ID is\n ${id}`
    );
  };
  // const onBookingAdded = booking => {
  //  setBookingList(prevState => ({
  // ...prevState.BookingList, booking
  // }))
  // };

  // const onBookingCancelled = () => {
  //   var newFoodList = [...state.foodList];
  //   newFoodList.splice(state.selectedIndex, 1);

  //   setState(prevState => ({
  //     foodList: (prevState.foodList = newFoodList),
  //   }));

  //   props.navigation.popToTop();
  // };

  // const onBookingReceived = bookingList => {
  //   setBookingList(bookingList);
  // };

  const sendNotificationToTeam = async (s_t_obj, venue, date, name, match_id) => {
    let { TeamName, uid, id, } = s_t_obj
    try {
      let user_res = await getSpecificUserById(s_t_obj.uid)
      let sender_user_res = await getSpecificUserById(user.uid)
      console.log("sender user------------", sender_user_res)
      const message = {
        to: user_res.notification_token,
        sound: 'default',
        title: 'Match Request',
        body: `${name} is requesting for match at ${venue} from ${date.toDateString()}`,
        data: { match_id, notification_token: sender_user_res.notification_token },
      };

      let res = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      setLoader(false)
      return (res)

    } catch (error) {
      setLoader(false)
      return error
    }
  }
  useEffect(() => {

    if (selectedSport == "Football") {
      // console.log("called thissss");
      getFootballTeams(onTeamsReceived);
    } else if (selectedSport === "Basketball") {
      getBasketballTeams(onTeamsReceived);
    } else if (selectedSport === "Cricket") {
      getCricketTeams(onTeamsReceived);
    }
  }, [selectedSport]);

  const onTeamsReceived = (teamList) => {
    setTeamList(teamList);
    console.log(teamList[0]);
  };
  const onVenueReceived = (venueList) => {
    setVenueList(venueList);
    // console.log(venueList);
  };

  useEffect(() => {
    getVenues(onVenueReceived);
  }, []);
  useEffect(() => {
    // console.log(date);
  }, [date]);

  const image = require("../../assets/backgroundone.jpg");
  return (
    <View style={styles.container}>
      <MatchNotificationComponent
        notification={match_notification}
        isVisible={modal}
        close={() => { setModalShow(false), set_match_notification(null) }} />
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {/* <Notification /> */}
        <View>
          <Text style={styles.heading}>Lets Play!</Text>
        </View>
        <View style={styles.inputFields}>
          <Dropdown
            label="Sport"
            data={Sports}
            onSelect={setSport}
            typeSport="sport"
          />
          <Dropdown
            label="Venue"
            data={venueList}
            onSelect={setVenue}
            typeSport="venue"
          />
          <Dropdown
            label="Teams Available"
            data={teamList}
            onSelect={setTeam}
            typeSport="team"
          // category={selectedSport}
          />
          <View>
            <View style={{ marginVertical: 10 }}>
              <Button
                onPress={showDatepicker}
                title="Select Date"
                color={"#000"}

              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Button
                onPress={showTimepicker}
                title="Select Time"
                color={"#000"}
              />
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </View>
          {/* <CustomTextInput
            placeholder="Search team to play against"
            containerStyle={{ marginVertical: 10 }}
          /> */}
          <View>
            <Button
              title={loader ? "Sending Request" : "Request Booking"}
              color={"#B7081B"}
              type="submit"
              disabled={loader}
              onPress={handleBooking}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    paddingTop: 50,
    // justifyContent: "center"
  },
  heading: {
    marginVertical: 15,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputFields: {
    width: windowWidth / 1.2,
    alignSelf: "center",
    justifyContent: "space-around",
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonStyle: {
    padding: 10,
  },
  dateButton: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#1E6738",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
});

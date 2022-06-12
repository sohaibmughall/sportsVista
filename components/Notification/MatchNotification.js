// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
import { async } from '@firebase/util';
import React, { useState, useEffect, useRef, } from 'react';
import { Text, View, Button, Platform, StyleSheet, Pressable, Alert, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
// import {useNavigation} from "@react-navigation/native"
import { firebase } from '../../src/firebase/config'

// Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: false,
//         shouldSetBadge: false,
//     }),
// });

const MatchNotificationComponent = ({
  notification,
  description,
  isVisible,
  close,
}) => {
  const { data, title, body } = notification ? notification : {}
  const [loading, setLoading] = useState(false)
  const [r_loading, set_r_Loading] = useState(false)
  const onReject = async () => {
    set_r_Loading(true)
    await accept_or_reject("Rejected")
    set_r_Loading(false)
    close()
  }
  const onAccept = async () => {
    setLoading(true)
    await accept_or_reject("Accepted")
    setLoading(false)
    close()
  }
  const accept_or_reject = async (status) => {
    try {
      let res = await firebase.firestore().collection("Matches").doc(data.match_id).update({ Confirmation: status })
      let notification_res = await sendNotificationToTeam(status)
      Alert.alert("SUCCESS", `MATCH REQUEST ${status == "Accepted" ? "ACCEPTED" : "REJECTED"} SUCCESSFULLY`)
      return true
    } catch (error) {
      return false
      Alert.alert("ERROR", "SOMETHING WENT WRONG")
    }
  }

  //  send notification-----------------
  const sendNotificationToTeam = async (status) => {
    try {
      const message = {
        to: data.notification_token,
        sound: 'default',
        title: 'Match Request',
        body: `Your request for match is ${status}`,
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
      return (res)
    } catch (error) {
      return error
    }
  }
  return (
    // <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        close()
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{title}</Text>
          <Text style={styles.modalBody}>{body}</Text>
          <View style={styles.btnRow}>
            <TouchableOpacity onPress={onReject} style={styles.btn}>
              {r_loading ? <ActivityIndicator size={20} color={"white"} />
                : <Text style={styles.btnText}>
                  Reject
                </Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={onAccept} style={[styles.btn, { backgroundColor: 'green' }]}>
              {loading ? <ActivityIndicator size={20} color={"white"} />
                : <Text style={styles.btnText}>
                  Accept
                </Text>}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

    // </View>
  )


}




const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#0009"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    paddingHorizontal: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    height: '40%'
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    position: "absolute",
    backgroundColor: 'red',
    bottom: 0,
    width: "100%",

  },
  btn: {
    paddingHorizontal: 15,
    paddingVertical: 13,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",

  },
  btnText: {
    fontSize: 17,
    color: "white"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 20
  },
  modalBody: {
    textAlign: 'center',
    fontSize: 17,
    marginHorizontal: 20
  }
});

export default MatchNotificationComponent

import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { windowWidth } from "../../src/utils/index";
import { firebase } from '../../src/firebase/config'
import { getAuth } from "firebase/auth";
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import moment from "moment";
import { Button, Input } from 'react-native-elements'
import { getBookings } from "../../src/api/bookingApi";



const ChatScreen = (props) => {

    const scrollRef = useRef(<ScrollView />);
    const [message, setmessage] = useState("");

    const auth = getAuth();
    const user = auth.currentUser;
    const [chats, setchats] = useState([]);
    const [sender, setsender] = useState([]);

    const { match_id, Match_Against_uuid, Match_Against } = props?.route?.params?.route;

    useEffect(async () => {
        setchats([])
        const unsubscribeListener = firebase.firestore().collection('Conversations').doc(match_id)
            .onSnapshot((doc) => {
                const firebaseData = doc.data()
                setchats(firebaseData ? firebaseData.messages : [])
                scrollRef.current?.scrollTo({
                    y: 1000,
                    animated: true
                });
            })

        return () => unsubscribeListener()

    }, [])

    const handleSubmit = async (event) => {
        if (
            message
        ) {
            scrollRef.current?.scrollTo({
                y: 1000,
                animated: true
            });
            const obj = {
                content: message,
                timestamp: moment(Date.now()).format('h:mm a'),
                uid: user.uid
            }
            const newarray = [...chats]
            newarray.push(obj)
            event.preventDefault();
            firebase.firestore().collection('Conversations').doc(match_id).set({
                messages: newarray
            })
            setmessage("")
        }

    }


    return (
        <View style={styles.container}>
            <ImageBackground resizeMode="cover" style={styles.image}>
                <Text style={styles.heading}>{Match_Against}</Text>
                <ScrollView ref={scrollRef}>
                    <KeyboardAvoidingView >
                        <View style={styles.chatcontainer}>

                            <View>
                                {chats && chats.map(chat => {
                                    return (
                                        <View style={user.uid === chat.uid ? styles.chatmessageLeft : styles.chatmessageRight}>
                                            <Text key={chat.content} style={{ textAlign: "left", color: "white", marginBottom: 10 }}>{chat.content}</Text>
                                            <Text key={chat.timestamp} style={{ textAlign: "right", color: "white", fontSize: 10 }}>{chat.timestamp}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                <View style={styles.inputarea}>
                    <Input value={message} onChangeText={(e) => setmessage(e)} placeholder="Type Message"
                        leftIcon={{ type: 'font-awesome', name: 'comment' }} />
                    <Button title={"send"} onPress={(event) => handleSubmit(event)} />
                </View>

            </ImageBackground>
        </View>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    cardContainer: {
        padding: 20
    },
    inputarea: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        width: "85%"
    },
    conf: {
        alignItems: "flex-end"
    },
    chatmessageLeft: {
        backgroundColor: "black",
        width: "70%",
        padding: 14,
        borderRadius: 8,
        color: "white",
        marginTop: 10
    },
    chatmessageRight: {
        backgroundColor: "#1E6738",
        alignSelf: "flex-end",
        width: "70%",
        padding: 10,
        borderRadius: 8,
        color: "white",
        marginTop: 10
    },

    chatcontainer: {
        padding: 20,
        backgroundColor: "transparent",

    },
    card: {
        paddingBottom: 10
    },
    container: {
        flex: 1,
        // display:"flex",
        // alignContent:"center",
        // alignItems:"center"
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
        borderBottomColor: "black",
        borderBottomWidth: 2,
        paddingBottom: 10
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

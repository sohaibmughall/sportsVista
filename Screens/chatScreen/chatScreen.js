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
    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    const scrollRef = useRef(<ScrollView />);
    const [message, setmessage] = useState("");

    const auth = getAuth();
    const user = auth.currentUser;
    const [chats, setchats] = useState([]);
    const { Match_Against } = props?.route?.params?.route;


    const obj = {
        content: message,
        timestamp: moment(Date.now()).format('h:mm:ss a'),
        uid: user.uid
    }

    const handleSend = () => {
        setchats((oldArray) => oldArray.concat(obj))
        setmessage("")
        scrollRef.current?.scrollTo({
            y: 10000,
            animated: true
        });

    }

    return (
        <View style={styles.container}>
            <ImageBackground resizeMode="cover" style={styles.image}>
                <Text style={styles.heading}>{Match_Against}</Text>
                <ScrollView ref={scrollRef}>
                    <KeyboardAvoidingView>
                        <View style={styles.chatcontainer}>

                            <View>
                                {chats.map(chat => {
                                    return (
                                        <View style={styles.chatmessageLeft}>
                                            <Text key={chat.content} style={{ textAlign: "left", color: "white", marginBottom: 10 }}>{chat.content}</Text>
                                            <Text key={chat.timestamp} style={{ textAlign: "right", color: "white" }}>{chat.timestamp}</Text>
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
                    <Button title={"send"} onPress={() => handleSend()} />
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
        backgroundColor: "gray",
        margin: 10,
        width: "70%",
        padding: 14,
        borderRadius: 8,
        color: "white",
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

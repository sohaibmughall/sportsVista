import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Alert,
    ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { windowWidth } from "../../src/utils/index";
import { firebase } from '../../src/firebase/config'
import { getAuth } from "firebase/auth";
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import moment from "moment";
import { Button } from 'react-native-elements'
import { getBookings } from "../../src/api/bookingApi";

const auth = getAuth();
const user = auth.currentUser;


const myBooking = (props) => {

    const [myBooking, setmyBooking] = useState([]);


    const onBookingRetrive = (bookings) => {
        const data = bookings.filter(item => item.Match_creater_uuid.uid == user.uid)
        setmyBooking(data);
    };

    useEffect(() => {
        getBookings(onBookingRetrive)
    }, [])


    const image = require("../../assets/backgroundone.jpg");
    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={styles.heading}>My Bookings</Text>
                <ScrollView>
                    <View >
                        <View style={styles.cardContainer}>
                            {myBooking.length ? myBooking.map(item => {
                                const date = moment(item.Data).format('MMMM Do YYYY, h:mm:ss a');
                                return (
                                    <View style={styles.card}>

                                        <Card >
                                            <Card.Title title={item.Match_creater + " / " + item.Match_Against} subtitle={date} />
                                            <View style={styles.conf}>
                                                <Text style={item.Confirmation == "Pending" ? { backgroundColor: "red", padding: 5, color: "white" } : { backgroundColor: "green", padding: 5, color: "white" }}> {item.Confirmation}</Text>
                                            </View>
                                            <Card.Content>
                                                <Title style={{ textTransform: "capitalize" }}>{"Destination" + " : " + item.Venue} </Title>
                                                <Paragraph>{"Sport" + " : " + item.Sport}</Paragraph>
                                                <Button onPress={() => props.navigation.navigate("myChats")} title={"Start Chat"} />
                                            </Card.Content>
                                        </Card>
                                    </View>
                                )
                            }) : <Text> YOU Have No booking yet </Text>}
                        </View>
                    </View>
                </ScrollView>

            </ImageBackground>
        </View>
    );
};

export default myBooking;

const styles = StyleSheet.create({
    cardContainer: {
        padding: 20
    },
    conf: {
        alignItems: "flex-end"
    },
    card: {
        paddingBottom: 10
    },
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

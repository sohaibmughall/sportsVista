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
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const auth = getAuth();
const user = auth.currentUser;


const myBooking = (props) => {

    const [myBooking, setmyBooking] = useState([]);

    useEffect(async () => {

        let bookingitem = []

        var snapshot = await firebase.firestore()
            .collection('Bookings')
            .get()

        snapshot.forEach((doc) => {
            const bookingItem = doc.data();
            bookingitem.push(bookingItem);
            const data = bookingitem.filter(item => item.uuid ? item.uuid == user.uid : null)
            setmyBooking(data)
        });
    }, []);


    const image = require("../../assets/backgroundone.jpg");
    const LeftContent = props => <Avatar.Icon {...props} icon="bookmark" />
    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={styles.heading}>My Bookings</Text>
                <ScrollView>
                    <View >
                        <View style={styles.cardContainer}>
                            {myBooking.map(item => {
                                return (
                                    <View style={styles.card}>

                                        <Card>
                                            <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
                                            <Card.Content>
                                                <Title>Card title</Title>
                                                <Paragraph>Card content</Paragraph>
                                            </Card.Content>
                                        </Card>
                                    </View>
                                )
                            })}
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

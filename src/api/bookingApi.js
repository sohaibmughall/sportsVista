import { firebase } from "../firebase/config";
// import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";

// export function login({ email, password }) {
//   firebase.auth().signInWithEmailAndPassword(email, password)
//     .then((value) => console.log(value))
// }

// export function signup({ email, password, displayName }) {
//   firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then((userInfo) => {
//       console.log(userInfo)
//       userInfo.user.updateProfile({ displayName: displayName.trim() })
//         .then(() => { })
//     })
// }

// export function subscribeToAuthChanges(authStateChanged) {
//   firebase.auth().onAuthStateChanged((user) => {
//     authStateChanged(user);
//   })
// }

// export function signout(onSignedOut) {
//   firebase.auth().signOut()
//     .then(() => {
//       onSignedOut();
//     })
// }

// export function updateBooking(booking, updateComplete) {
//   booking.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
//   console.log("Updating booking in firebase");

//   firebase.firestore()
//     .collection('Bookings')
//     .doc(booking.id).set(booking)
//     .then(() => updateComplete(booking))
//     .catch((error) => console.log(error));
// }

// export function deletebooking(booking, deleteComplete) {
//   console.log(booking);

//   firebase.firestore()
//     .collection('bookings')
//     .doc(booking.id).delete()
//     .then(() => deleteComplete())
//     .catch((error) => console.log(error));
// }

// export async function getBookings(bookingsRetreived) {

//   var bookingList = [];

//   var snapshot = await firebase.firestore()
//     .collection('Bookings')
//     .orderBy('createdAt')
//     .get()

//   snapshot.forEach((doc) => {
//     const bookingItem = doc.data();
//     bookingItem.id = doc.id;
//     bookingList.push(bookingItem);
//   });

//   bookingsRetreived(bookingList);
// }
export const addBooking = (booking, addComplete) => {
  // console.log(booking);
 return firebase
    .firestore()
    .collection("Bookings")
    .add({
      Confirmation: "Pending",
      Sport: booking.selectedSport,
      Date: booking.date,
      Match_Against: booking.selectedTeam,
      Match_Against_uuid: booking.uuid2,
      Match_creater: booking.myteam,
      Match_creater_uuid: booking.uuid,
      Venue: booking.selectedVenue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    // .then((snapshot) => {
    //   booking.id = snapshot.id;
    //   snapshot.set(booking);
    // })
    // .then(() => addComplete(booking))
    // .catch((error) => console.log(error));
};
// export const addBooking = (booking, addComplete) => {
//   console.log(booking);
//  return firebase
//     .firestore()
//     .collection("Matches")
//     .add({
//       Confirmation: "Pending",
//       Sport: booking.selectedSport,
//       Date: booking.date,
//       Match_Against: booking.selectedTeam,
//       Match_Against_uuid: booking.uuid2,
//       Match_creater: booking.myteam,
//       Match_creater_uuid: booking.uuid,
//       Venue: booking.selectedVenue,
//       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//     })
//     // .then((snapshot) => {
//     //   booking.id = snapshot.id;
//     //   snapshot.set(booking);
//     // })
//     // .then(() => addComplete(booking))
//     // .catch((error) => console.log(error));
// };

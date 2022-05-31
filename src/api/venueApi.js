import {firebase} from '../firebase/config'

export async function getVenues(venuesRetreived) {

    var venueList = [];
  
    var snapshot = await firebase.firestore()
      .collection('Venues')
      .get()
  
    snapshot.forEach((doc) => {
      const venueItem = doc.data();
      venueItem.id = doc.id;
      venueList.push(venueItem);
    });
  
    venuesRetreived(venueList);
  }
  
import {firebase} from '../firebase/config';

export const getFootballTeams = async teamsRetreived => {
  var teamList = [];
  try {
    var snapshot = await firebase.firestore().collection('Teams').doc('24Lsqb7Bizv7BwNh1Oh1').collection('Football').get();

    snapshot.forEach(doc => {
      const teamItem = doc.data();
      teamItem.id = doc.id;
      teamList.push(teamItem);
    });
    teamsRetreived(teamList);
  } catch (err) {
    console.log(err);
  }
};
export const getBasketballTeams = async teamsRetreived => {
  var teamList = [];
  try {
    var snapshot = await firebase.firestore().collection('Teams').doc('24Lsqb7Bizv7BwNh1Oh1').collection('Basketball').get();

    snapshot.forEach(doc => {
      const teamItem = doc.data();
      teamItem.id = doc.id;
      teamList.push(teamItem);
    });
    teamsRetreived(teamList);
  } catch (err) {
    console.log(err);
  }
};
export const getCricketTeams = async teamsRetreived => {
  var teamList = [];
  try {
    var snapshot = await firebase.firestore().collection('Teams').doc('24Lsqb7Bizv7BwNh1Oh1').collection('Cricket').get();

    snapshot.forEach(doc => {
      const teamItem = doc.data();
      teamItem.id = doc.id;
      teamList.push(teamItem);
    });
    teamsRetreived(teamList);
  } catch (err) {
    console.log(err);
  }
};

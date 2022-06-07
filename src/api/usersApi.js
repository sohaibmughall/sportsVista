import {firebase} from '../firebase/config';

export const getSpecificUserById = async id => {

  try {
    var doc = await firebase.firestore().collection('Users').doc(id).get()
    return doc.data()
  } catch (err) {
     return err
  }
};

export const updateSpecificUser=async (id,obj)=> {
try {
    var washingtonRef = firebase.firestore().collection("Users").doc(id);
    let res=await washingtonRef.update(obj)
    console.log("update res------------",res)
    return res
} catch (error) {
    console.log("error------------",error)
    return error 
}
}


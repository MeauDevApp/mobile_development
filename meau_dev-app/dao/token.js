import db from '../database/firebaseDb';
import { setDoc, doc } from 'firebase/firestore';

export const addDeviceToken = async (idUser, token) => {
    const userDocRef = doc(db, 'tokens', idUser);
    const docData = {
        token: token,
        idUser: idUser,
      };
    await setDoc(userDocRef, docData)
    .then(() => {
      console.log("Document has been added successfully)");
    })
    .catch(error => {
        console.log("Error: ", error);
    })
  };
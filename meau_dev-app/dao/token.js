import db from '../database/firebaseDb';
import { setDoc, doc, getDoc } from 'firebase/firestore';

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

export const getUserToken = async (id) => {
  console.log("idIIIIIIIIIIII", id)
  const tokenDoc = await getDoc(doc(db, 'tokens', id))

  if (tokenDoc.exists()) {
    console.log("doc", tokenDoc.data())
    return tokenDoc.data().token;
  }
  else {
    console.log('No such document!');
  }
};
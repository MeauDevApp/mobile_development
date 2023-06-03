import db from '../database/firebaseDb';
import { collection, doc } from 'firebase/firestore';
import { getDocs, getDoc, deleteDoc, updateDoc, setDoc } from 'firebase/firestore';

export const addUser = async (user, uid) => {
  const userDocRef = doc(db, 'users', uid);

  await setDoc(userDocRef, user)
  .then(() => {
    console.log("Document has been added successfully)");
  })
  .catch(error => {
      console.log(error);
  })
};

export const getUsers = async () => {
  var users = [];

  await getDocs(collection(db, 'users'))
  .then((docs) => {
    docs.forEach((doc) => {
      users.push(doc.data());
    });
  })
  .catch((error) => {
    console.log(error);
  });

  console.log(users);
  return users;
};

export const getUser = async (id) => {
  const userDoc = await getDoc(doc(db, 'users', id))

  if (userDoc.exists())
    return userDoc;
  else {
    console.log('No such document!');
  }
};

export const removeUser = async (id) => {
  try {
    const userDoc = doc(db, 'users', id);

    await deleteDoc(userDoc);    
    console.log('User successfully deleted!');
  } catch (error) {
    console.error('Error removing user: ', error);
  }
};

export const updateUser = async (id, data) => {
  try {
    const userDoc = doc(db, 'users', id);
    console.log(data);
    await updateDoc(userDoc, data);
    console.log('User successfully updated!');
  } catch (error) {
    console.error('Error updating user: ', error);
  }
};

import { getDownloadURL, ref } from "firebase/storage";
import {
  createUser,
  getUser,
  getUsers,
  removeUser,
  updateUser,
} from "../dao/user";
import { getAuth } from "firebase/auth";
import { storage } from "../database/firebaseDb";
import db from "../database/firebaseDb";
import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, updateDoc } from "firebase/firestore";

const auth = getAuth();

export const create = (user) => {
  try {
    createUser(user);
  } catch (error) {
    console.log("Error:", error);
  }
};

export const getAll = () => {
  return getUsers();
};

export const get = (id) => {
  return getUser(id);
};

export const remove = (id) => {
  return removeUser(id);
};

export const update = (id, data) => {
  return updateUser(id, data);
};

export const getCurrentUser = () => {
  const currentUser = getAuth().currentUser;

  if (currentUser) return currentUser;
};

export const getToken = async () => {
  const currentUser = getAuth().currentUser;

  if (currentUser) {
    const token = await currentUser.getIdToken();
    return token;
  }
};

export const tokenIsValid = async (token, lastLogin) => {
  const currentTime = new Date().getTime();
  const lastLoginTime = new Date(lastLogin).getTime();
  const timeDiffInHours = (currentTime - lastLoginTime) / (1000 * 60 * 60);

  if (timeDiffInHours > 72 || !token || token.length == 0) return false;
  else return true;
};

// export const updateTimestamp = async (user) => {
//   try {
//     if (user) {
//       await user.updateProfile({
//         lastLoginAt: new Date().toUTCString(),
//       });
//       console.log("User updated successfully in the authentication service");
//     } else {
//       console.log("No user found");
//     }
//   } catch (error) {
//     console.error("Error updating user:", error);
//   }
// };

export const transformTimestampIntoDate = async (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export const verifyToken = async (userToken) => {
  const currentUser = getAuth().currentUser;

  if (currentUser) {
    const lastLogin = currentUser.metadata.lastLoginAt;
    const tokenValid = await tokenIsValid(userToken.token, parseInt(lastLogin));

    if (!tokenValid) {
      await getAuth().signOut();
      // navigation.navigate("Login");
      return false;
    } else return true;
    // await currentUser.ref.update({ lastLoginAt: new Date().toISOString() });
  } else {
    return false;
  }
};

export const signOut = async () => {
  await signOut(auth)
    .then(() => {
      console.log("User signed out successfully");
    })
    .catch((error) => {
      console.log("Error signing out:", error);
    });
};

export const addAnimalToFavorites = async (userId, animalId) => {
  console.log("inside")
  console.log("userId", userId)
  try {
    const userDoc = await getDoc(doc(db, 'users', userId))

    if (userDoc.exists) {
      console.log("another inside")
      
      const favorites = userDoc.data().favorites || [];
      if (!favorites.includes(animalId)) {
        favorites.push(animalId);
        console.log("animalId", animalId)
        console.log(favorites)
        // await updateDoc(userDoc, favorites);
        // await updateDoc(doc(db, 'users', userId), { favorites });
        await updateDoc(userDoc, favorites);
      }
    }
  } catch (error) {
    console.error("Error adding animal to favorites:", error);
  }
};

export const removeAnimalFromFavorites = async (userId, animalId) => {
  try {
    const userDoc = getDoc(doc(db, 'users', userId))

    if (userDoc.exists) {
      const favorites = userDoc.data().favorites || [];
      const index = favorites.indexOf(animalId);
      if (index !== -1) {
        favorites.splice(index, 1);
        await userRef.update({ favorites });
      }
    }
  } catch (error) {
    console.error("Error removing animal from favorites:", error);
  }
};

const blobToBase64 = (blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export const getImageBase64 = async (path) => {
  console.log(path)
  if (!path) return null;

  try {
    const reference = ref(storage, path);
    const url = await getDownloadURL(reference);

    const response = await fetch(url);
    const blob = await response.blob();
    const base64 = await blobToBase64(blob);

    return base64;
  } catch (error) {
    console.log("Error retrieving image from Firebase Storage:", error);
    return "";
  }
};

export const getInterestedPeople = async (currentUserId, userIds) => {
  var users = [];
  const lastMessage = '';

  if (userIds && userIds.length > 0) {
    for (const uid of userIds) {
      var imageBase64 = "";
      const user = await getUser(uid);

      if (user && user.imageRef)
        imageBase64 = await getImageBase64(user.imageRef);

      if(currentUserId != '')
        lastMessage = await getLastChatMessage(currentUserId, uid);
      console.log(lastMessage);

      users.push({ ...user, imageBase64, uid, lastMessage });
    }
  }

  return users;
};

export const getChatUsersIds = async (id) => {
  const currentUserDoc = await getUser(id);
  return currentUserDoc.chatUsers;
};

export const getLastChatMessage = async (currentUserId, uid) => {
  const subcollectionId = computeHash(currentUserId, uid);
  const parentCollectionRef = collection(db, "chats");
  const parentDocRef = doc(parentCollectionRef, subcollectionId);
  const subcollectionRef = collection(parentDocRef, subcollectionId);
  const q = query(subcollectionRef, orderBy("createdAt", "desc"), limit(1));

  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const lastDocument = snapshot.docs[0];
    return lastDocument.data().text;
  } else {
    return "Não há mensagens";
  }
};

const mapUser = (user) => {
  return {
    _id: user.uid,
    name: user.displayName,
    avatar: user.photoURL,
  };
}

const getChatId = (receiverId) => {
  const computedHash = computeHash(getCurrentUser().uid, receiverId);
  return computedHash;
};

const generateRandomNumber = (min, max) => {
  const randomDecimal = Math.random();
  const randomNumber = min + randomDecimal * (max - min);
  const roundedNumber = Math.floor(randomNumber);

  return roundedNumber;
};


export const sendInterestMessage = async (name, ownerId) => {
  console.log('sendInterestMessage')
  const timestamp = new Date();

  const subcollectionId = getChatId(ownerId);
  console.log(subcollectionId);

  const parentCollectionRef = collection(db, "chats");
  const parentDocRef = doc(parentCollectionRef, subcollectionId);
  const subcollectionRef = collection(parentDocRef, subcollectionId);

  try {
    const message = {
      _id: generateRandomNumber(1, 10),
      createdAt: timestamp,
      text: `Olá, estou interessado no ${name}`,
      user: mapUser(getCurrentUser()),
    };

    await setDoc(parentDocRef, {});
    await addDoc(subcollectionRef, message);
    // await updateChatUsers(getCurrentUser().uid, ownerId);
    console.log("Document successfully written!");
  } catch (error) {
    console.log("error", error);
  }
};

export const computeHash = (senderId, receiverId) => {
  const sortedUserIds = [senderId, receiverId].sort();
  const inputString = sortedUserIds.join("");

  return inputString;
};

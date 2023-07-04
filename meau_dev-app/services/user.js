import { getDownloadURL, ref } from "firebase/storage";
import { createUser, getUser, getUsers, removeUser, updateUser } from "../dao/user";
import { getAuth } from "firebase/auth";
import { storage } from "../database/firebaseDb";
import CryptoJS from 'crypto-js';

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

  if (timeDiffInHours > 72 || !token || token.length == 0) 
    return false;
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
    }
    else
      return true;
      // await currentUser.ref.update({ lastLoginAt: new Date().toISOString() });
  } 
  else {
    return false;
  }
};

export const signOut = async () => {
  await signOut(auth)
    .then(() => {
      console.log('User signed out successfully');
    })
    .catch((error) => {
      console.log('Error signing out:', error);
    });
};

const blobToBase64 = (blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export const getImageBase64 = async (path) => {
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

export const getInterestedPeople = async (userIds) => {
  var users = [];

  for (const uid of userIds) {
    var imageBase64 = "";
    const user = await getUser(uid);

    console.log(user)
    if (user.imageRef)
      imageBase64 = await getImageBase64(user.imageRef);

    users.push( { ...user, imageBase64, uid } );
  };

  return users;
};

export const getChatUsers = async () => {
  const currentUserDoc = await getUser(getCurrentUser().uid);
  return currentUserDoc.chatUsers;
};

export const computeHash = (senderId, receiverId) => {
  const sortedUserIds = [senderId, receiverId].sort();
  const inputString = sortedUserIds.join('');

  return inputString;
}

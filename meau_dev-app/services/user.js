import { addUser, getUser, getUsers, removeUser, updateUser } from "../dao/user";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export const create = async (user) => {
  try {
    const uid = await createUserInAuthEntity(user.email, user.password);
    await addUser(user, uid);
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

export const getCurrentUser = async () => {
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

export const tokenIsValid = async (lastLogin) => {
  const currentTime = new Date().getTime();
  const lastLoginTime = new Date(lastLogin).getTime();
  const timeDiffInHours = (currentTime - lastLoginTime) / (1000 * 60 * 60);

  if (timeDiffInHours > 72) return false;
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

export const verifyToken = async () => {
  const currentUser = getAuth().currentUser;

  if (currentUser) {
    // const userDoc = await getUser(currentUser.uid); // it's not connected to firestore
    const lastLogin = currentUser.metadata.lastLoginAt;
    // const expirationTime = transformTimestampIntoDate(lastLogin);
    const tokenValid = tokenIsValid(parseInt(lastLogin));

    if (!tokenValid) {
      await getAuth().signOut();
      navigation.navigate("Login");
      return false;
    }
    else
      return true;
      // await currentUser.ref.update({ lastLoginAt: new Date().toISOString() });
  }
};

export const createUserInAuthEntity = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user.uid;

  } catch (error) {
    console.log('Sign-up error:', error);
    throw new Error('Failed to sign up in auth service.');
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

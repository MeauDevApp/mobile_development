import { SIGN_OUT } from "../constants";
import { getAuth } from "firebase/auth";

export const signOut = async (dispath) => {
  return await getAuth()
    .signOut()
    .then(() => {
      console.log("here");
      navigation.navigate("Login");

      return {
        type: SIGN_OUT
      };
    })
    .catch(error => (console.log(error)));
};

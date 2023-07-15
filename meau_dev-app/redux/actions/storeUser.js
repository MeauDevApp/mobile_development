import { USER } from "../constants";

export const storeUser = (user) => {
  return {
    type: USER,
    payload: user,
  };
}

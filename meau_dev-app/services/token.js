import {addDeviceToken } from "../dao/token";
import { getCurrentUser } from '../services/user';

export const addToken = async (token) => {
    const idUser = getCurrentUser() ? getCurrentUser().uid : null;
    try {
      await addDeviceToken(idUser, token);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
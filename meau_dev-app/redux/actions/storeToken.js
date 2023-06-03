import { TOKEN } from "../constants";

export const storeToken = (token) => {
  return {
    type: TOKEN,
    payload: token,
  };
}

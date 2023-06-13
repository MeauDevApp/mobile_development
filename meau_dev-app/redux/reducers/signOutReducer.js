import { SIGN_OUT } from "../constants";

const initialState = {
  token: '',
};

const signOutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_OUT:
      return {
        ...state,
        token: '',
      };
    default:
      return state;
  }
};

export default signOutReducer;

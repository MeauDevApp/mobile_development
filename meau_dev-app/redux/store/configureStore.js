import { createStore, combineReducers } from "redux";
import tokenReducer from "../reducers/tokenReducer";
import signOutReducer from "../reducers/signOutReducer";
import userReducer from "../reducers/userReducer";

const rootReducer = combineReducers({
  token: tokenReducer,
  signOut: signOutReducer,
  user: userReducer,
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;

import { createStore, combineReducers } from "redux";
import tokenReducer from "../reducers/tokenReducer";
import signOutReducer from "../reducers/signOutReducer";

const rootReducer = combineReducers({
  token: tokenReducer,
  signOut: signOutReducer,
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;

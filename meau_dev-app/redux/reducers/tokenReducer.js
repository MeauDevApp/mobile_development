import { TOKEN } from "../constants";

const initialState = {
  token: '',
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN:
      return {
        token: action.payload,
      };
      default:
        return state;
  }
};

export default tokenReducer;

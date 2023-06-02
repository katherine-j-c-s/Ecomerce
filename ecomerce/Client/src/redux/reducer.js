import { SIGN_IN } from "./types";

//Nuestro estado inicial.
const initialState = {
  access: false,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN:
      return { ...state, access: true };

    default:
      return state;
  }
};

export default rootReducer;

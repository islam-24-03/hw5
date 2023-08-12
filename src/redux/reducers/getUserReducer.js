import { types } from "../types";

const initialState = {
   users: [],
   error: null,
};

const userReducers = (state = initialState, action) => {
   switch (action.type) {
      case types.GET_USERS_ON:
         return {
            ...state,
            users: action.payload,
            error: null,
         };
      case types.GET_USERS_OFF:
         return {
            ...state,
            error: action.payload,
         };
      default:
         return state;
   }
};

export default userReducers;
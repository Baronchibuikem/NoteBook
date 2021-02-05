import {
  REQUEST_LOADING,
  SET_CURRENT_USER,
  SET_USER_TOKEN,
  SET_CURRENT_DETAIL
} from "../actions/action_types";
import isEmpty from "../../validation/is-empty";

const initialState = {
  token: localStorage.getItem("token"),
  isLoading: false,
  isAuthenticated: false,
  user: {},
  registered: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        registered: true,
      };
    case SET_USER_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_CURRENT_DETAIL:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default reducer;

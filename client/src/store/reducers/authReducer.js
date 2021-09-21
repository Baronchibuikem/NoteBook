import {
  REQUEST_LOADING,
  SET_CURRENT_USER,
  SET_USER_TOKEN,
  SET_CURRENT_DETAIL,
  LOGOUT,
  LOGIN,
} from "../actions/action_types";
import isEmpty from "../../validation/is-empty";

const initialState = {
  user: {},
  registered: false,
  user: null,
  isAuthenticated: false,
  userRole: [],
  token: localStorage.getItem("token"),
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
        user: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      return initialState;
    case LOGIN:
      return {
        ...state,
        userRole: action.userRole,
        token: localStorage.setItem("token", action.token),
        user: action.user,
        isAuthenticated: action.authenticated,
      };
    default:
      return state;
  }
};

export default reducer;

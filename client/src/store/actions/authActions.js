import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { callPlainApi, callSecuredApi } from "../../utils/api_calls";
import { saveCookie } from "../../utils/helpers";
import {
  SET_CURRENT_USER,
  SET_USER_TOKEN,
  SET_CURRENT_DETAIL,
  LOGOUT,
  LOGIN,
} from "./action_types";

// Register User action
export const registerUser = (data, history, cb) => async (dispatch) => {
  try {
    const response = await callPlainApi("/register", data, "POST");
    dispatch({ type: SET_CURRENT_USER });
    cb("registration successful", null);
    history.push("/login");
  } catch (error) {
    cb(null, error);
  }
};

// Login - Get User Token
// export const loginUser = (data, history, cb) => {
//   return async (dispatch) => {
//     try {
//       const res = await callPlainApi("/login", data, "POST");
//       // Save to localStorage
//       const { token } = res;
//       // Set token to local storage
//       dispatch({ type: SET_USER_TOKEN, payload: token });
//       // Decode token to get user data
//       const decoded = jwt_decode(token);
//       // Set current user;

//       cb("successfully logged in", null);
//       dispatch(setCurrentUser(decoded, history));
//     } catch (err) {
//       cb(null, err.response.data);
//     }
//   };
// };

export const loginUser =
  (data, history, cb = () => {}) =>
  async (dispatch) => {
    const authenticate = true;
    try {
      const authResponse = await callPlainApi("/login", data, "POST");
      const { token, data: user } = authResponse;
      dispatch({
        type: LOGIN,
        user: user,
        token,
        userRole: user.userRole,
        authenticated: authenticate,
      });
      history.push("/");
    } catch (error) {
      cb(null, error);
    }
  };

// Set logged in user
export const setCurrentUser = (decoded = null, history = null) => {
  if (history) {
    history.push("/");
  }

  return {
    type: SET_CURRENT_DETAIL,
    payload: decoded,
  };
};

export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

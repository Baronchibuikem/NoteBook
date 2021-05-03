import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { callPlainApi, callSecuredApi } from "../../utils/api_calls";
import { saveCookie } from "../../utils/helpers";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_USER_TOKEN,
  SET_CURRENT_DETAIL,
} from "./action_types";

// Register User action
export const registerUser = (params, cb = () => {}) => async (dispatch) => {
  const { firstName, lastName, email, password, password2 } = params.data;
  try {
    const response = await callPlainApi(
      "/api/users/register",
      {
        firstName,
        lastName,
        email,
        password,
        password2,
      },
      "POST"
    );

    dispatch({ type: SET_CURRENT_USER });
  } catch (error) {
    cb(null, error);
  }
};

// Login - Get User Token
export const loginUser = (userData) => {
  return async (dispatch) => {
    const { email, password } = userData;
    try {
      const res = await callPlainApi(
        "/api/users/login",
        { email, password },
        "POST"
      );

      // Save to localStorage
      const { token } = res.data;
      // Set token to local storage
      dispatch({ type: SET_USER_TOKEN, payload: token });
      saveCookie("notebook", token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // console.log(decoded, "decoded");
      // Set current user
      dispatch(setCurrentUser(decoded));
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err && err.response && err.response.data,
      });
    }
  };
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_DETAIL,
    payload: decoded,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

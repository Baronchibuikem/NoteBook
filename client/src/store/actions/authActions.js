import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { route } from "../api_calls";
import { GET_ERRORS, SET_CURRENT_USER, SET_USER_TOKEN } from "./action_types";

// Register User action
export const registerUser = (params) => async (dispatch) => {
  const { name, email, password, password2 } = params.data;
  try {
    const response = await route.post("/api/users/register", {
      name,
      email,
      password,
      password2,
    });
    if (response) {
      dispatch({ type: SET_CURRENT_USER, payload: response.data });
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error && error.response && error.response.data,
    });
  }
};

// Login - Get User Token
export const loginUser = (userData) => {
  return async (dispatch) => {
    const { email, password } = userData;
    try {
      const res = await route.post("/api/users/login", { email, password });
      if (res.status === 200) {
        // Save to localStorage
        const { token } = res.data;
        // Set token to local storage
        dispatch({ type: SET_USER_TOKEN, payload: token });
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // console.log(decoded, "decoded");
        // Set current user
        dispatch(setCurrentUser(decoded));
      }
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
    type: SET_CURRENT_USER,
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

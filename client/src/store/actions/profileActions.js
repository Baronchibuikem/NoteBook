import axios from "axios";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
} from "./action_types";
import createHistory from "history/createHashHistory";

// Get current profile
export const getCurrentProfile = () => (dispatch, getState) => {
  const token = getState().authentication.token;
  const userToken = (axios.defaults.headers.common["Authorization"] = token);
  dispatch(setProfileLoading());
  axios
    .get("/api/profile", userToken)
    .then((res) => {
      console.log("get current user", res.data);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

// Get profile by handle
export const getProfileByHandle = (handle) => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: null,
      })
    );
};

// Create Profile
export const createProfile = (profileData) => {
  return async (dispatch, getState) => {
    // dispatch(setPostLoading());
    const token = await getState().authentication.token;
    const userToken = (axios.defaults.headers.common["Authorization"] = token);
    try {
      const response = await axios.post(
        "/api/profile",
        profileData.data,
        userToken
      );
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
      // console.log(error.response.data);
    }
  };
};

// Add experience
export const addExperience = (expData) => async (dispatch, getState) => {
  const token = await getState().authentication.token;
  const userToken = (axios.defaults.headers.common["Authorization"] = token);
  try {
    const response = await axios.post(
      "/api/profile/experience",
      expData.data,
      userToken
    );
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

// Add education
export const addEducation = (eduData) => async (dispatch, getState) => {
  const token = await getState().authentication.token;
  const userToken = (axios.defaults.headers.common["Authorization"] = token);
  try {
    const response = await axios.post(
      "/api/profile/education",
      eduData.data,
      userToken
    );
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

// Delete Experience
export const deleteExperience = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Delete Education
export const deleteEducation = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Get all profiles
export const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then((res) =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILES,
        payload: null,
      })
    );
};

// Delete account & profile
export const deleteAccount = () => (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then((res) =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

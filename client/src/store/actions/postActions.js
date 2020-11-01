import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  DISABLE_LOADING,
} from "./action_types";

// Add Post
export const addPost = (postData) => (dispatch, getState) => {
  const token = getState().authentication.token;
  const userToken = (axios.defaults.headers.common["Authorization"] = token);
  dispatch(setPostLoading());
  dispatch(clearErrors());
  axios
    .post("/api/posts", { text: postData }, userToken)
    .then((res) =>
      dispatch({
        type: ADD_POST,
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

// Get Posts
export const getPosts = () => async (dispatch) => {
  dispatch(setPostLoading());
  dispatch(clearErrors());
  const res = await axios.get("/api/posts");
  console.log(res.data, "Get Post");
  try {
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_POSTS,
      payload: null,
    });
  }
};

// Get Post
export const getPost = (id) => async (dispatch) => {
  dispatch(setPostLoading());
  try {
    const res = await axios.get(`/api/posts/${id}`);
    console.log(res.data, "get single post");
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_POST,
      payload: null,
    });
  }
};

// Delete Post
export const deletePost = (id) => (dispatch) => {
  axios
    .delete(`/api/posts/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_POST,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const postLike = (id) => {
  return async (dispatch, getState) => {
    dispatch(setPostLoading());
    const token = getState().authentication.token;
    const userToken = (axios.defaults.headers.common["Authorization"] = token);
    try {
      const res = await axios.post(`/api/posts/like/${id}`, userToken);
      dispatch(getPosts());
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  };
};

// Remove Like
export const removeLike = (id) => {
  return async (dispatch, getState) => {
    const token = getState().authentication.token;
    const userToken = (axios.defaults.headers.common["Authorization"] = token);
    try {
      const res = await axios.post(`/api/posts/unlike/${id}`, userToken);
      if (res) {
        dispatch(getPosts());
      }
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  };
};

// Add Comment
export const addComment = (params) => (dispatch, getState) => {
  // we get the current token from the state and add it to our authorization header
  const token = getState().authentication.token;
  const userToken = (axios.defaults.headers.common["Authorization"] = token);
  dispatch(clearErrors());
  axios
    .post(
      `/api/posts/comment/${params.postId}`,
      { text: params.comment },
      userToken
    )
    .then((res) =>
      dispatch({
        type: GET_POST,
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

// Delete Comment
export const deleteComment = (postId, commentId) => (dispatch) => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
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

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING,
  };
};

// Disable loading state
export const disablePostLoading = () => {
  return {
    type: DISABLE_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

import axios from "axios";

import { callPlainApi, callSecuredApi } from "../../utils/api_calls";
import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  DISABLE_LOADING,
  GET_CATEGORIES,
  SERVER_ERRORS,
  ADD_CATEGORY,
} from "./action_types";

// Add category
// Add Post
export const addCategory = (data, cb) => async (dispatch) => {
  console.log(data, "category name");
  try {
    await callSecuredApi("/category/addCategory", data, "POST");
    cb("Category added", null);
    dispatch(getCategories());
  } catch (error) {
    cb(null, error);
  }
};

// Add Post
export const addPost = (data) => async (dispatch) => {
  console.log(data);
  try {
    const res = await callSecuredApi("/post/addpost", data, "POST");
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get Posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await callSecuredApi("/posts", null, "GET");
    console.log(res.data, "for all post");
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
  try {
    const res = await callSecuredApi(`/post/${id}`, null, "GET");
    console.log(res, "from post id");
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

// for fetching categories
export const getCategories = () => async (dispatch, getState) => {
  const res = await callSecuredApi("/categories", null, "GET");
  try {
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SERVER_ERRORS,
      payload: null,
    });
  }
};

// Delete Post
export const deletePost = (id) => async (dispatch, getState) => {
  const res = await callSecuredApi(`/post/delete/${id}`, null, "DELETE");
  try {
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

// export const postLike = (id) => {
//   return async (dispatch, getState) => {
//     dispatch(setPostLoading());
//     const token = getState().authentication.token;
//     const userToken = (axios.defaults.headers.common["Authorization"] = token);
//     try {
//       await axios.post(`/api/posts/like/${id}`, userToken);
//       dispatch(getPosts());
//     } catch (error) {
//       dispatch({
//         type: GET_ERRORS,
//         payload: error.response.data,
//       });
//     }
//   };
// };

// // Remove Like
// export const removeLike = (id) => {
//   return async (dispatch, getState) => {
//     const token = getState().authentication.token;
//     const userToken = (axios.defaults.headers.common["Authorization"] = token);
//     try {
//       const res = await axios.post(`/api/posts/unlike/${id}`, userToken);
//       if (res) {
//         dispatch(getPosts());
//       }
//     } catch (error) {
//       dispatch({
//         type: GET_ERRORS,
//         payload: error.response.data,
//       });
//     }
//   };
// };

// // Add Comment
// export const addComment = (params) => (dispatch, getState) => {
//   // we get the current token from the state and add it to our authorization header
//   const token = getState().authentication.token;
//   const userToken = (axios.defaults.headers.common["Authorization"] = token);
//   dispatch(clearErrors());
//   axios
//     .post(
//       `/api/posts/comment/${params.postId}`,
//       { text: params.comment },
//       userToken
//     )
//     .then((res) =>
//       dispatch({
//         type: GET_POST,
//         payload: res.data,
//       })
//     )
//     .catch((err) =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data,
//       })
//     );
// };

// // Delete Comment
// export const deleteComment = (postId, commentId) => (dispatch) => {
//   axios
//     .delete(`/api/posts/comment/${postId}/${commentId}`)
//     .then((res) =>
//       dispatch({
//         type: GET_POST,
//         payload: res.data,
//       })
//     )
//     .catch((err) =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data,
//       })
//     );
// };

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

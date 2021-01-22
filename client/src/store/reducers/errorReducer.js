import { GET_ERRORS, CLEAR_ERRORS } from "../actions/action_types";

const initialState = {
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}

import { combineReducers } from "redux";
import authentication from "./authReducer";
import error_reducer from "./errorReducer";
import profilereducer from "./profileReducer";
import postreducer from "./postReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["authentication"],
};

const rootReducer = combineReducers({
  authentication,
  error_reducer,
  postreducer,
  profilereducer,
});

export default persistReducer(persistConfig, rootReducer);

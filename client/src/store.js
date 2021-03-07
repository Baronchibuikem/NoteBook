import { createStore, compose, applyMiddleware } from "redux";
import { persistStore } from 'redux-persist'
import thunk from "redux-thunk";
import rootReducer from "./store/reducers";


const middleware = [thunk];

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	rootReducer,
	composeEnhances(applyMiddleware(...middleware))
);

export const persistor = persistStore(store)



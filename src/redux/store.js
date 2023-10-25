// src/redux/store.js
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import addPatientInfoReducer from "./reducers/addPatientInfoReducer";

const rootReducer = combineReducers({
  user: userReducer,
  patientInfo: addPatientInfoReducer,
});

//Added dev tools for redux store for developers
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import wather from "./reducers/watherReducers";
import cities from "./reducers/citiesReducers";
import users from "./reducers/userReducers";

const rootReducers = combineReducers({
  wather,
  cities,
  users,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

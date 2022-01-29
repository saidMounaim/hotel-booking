import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducers = combineReducers({});

const initialState = {};

const store = createStore(
  rootReducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
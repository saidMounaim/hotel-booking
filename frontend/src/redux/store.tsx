import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userLoginReducer, userRegisterReducer, profileUpdateReducer } from './reducers/UserReducers';

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  profileUpdate: profileUpdateReducer
});

const userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo")!);

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage
  }
};

const store = createStore(
  rootReducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
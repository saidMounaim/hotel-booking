import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userLoginReducer, userRegisterReducer, profileUpdateReducer, passwordUpdateReducer } from './reducers/UserReducers';
import {roomsFetchReducer, roomDetailsReducer, roomCreateReviewReducer, roomCreateReducer } from './reducers/RoomReducers';
import { roomBookingCheckReducer, bookingCreateReducer, bookedDatesReducer, BookingsMyReducer } from './reducers/BookingReducers';

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  profileUpdate: profileUpdateReducer,
  passwordUpdate: passwordUpdateReducer,
  roomsFetch: roomsFetchReducer,
  roomDetails: roomDetailsReducer,
  roomCreateReview: roomCreateReviewReducer,
  roomCreate: roomCreateReducer,
  roomBookingCheck: roomBookingCheckReducer,
  bookedDates: bookedDatesReducer,
  bookingCreate: bookingCreateReducer,
  BookingsMy: BookingsMyReducer
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
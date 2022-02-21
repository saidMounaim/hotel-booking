import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { usersFetchReducer, userDetailsReducer, userUpdateReducer, userDeleteReducer, userLoginReducer, userRegisterReducer, profileUpdateReducer, passwordUpdateReducer } from './reducers/UserReducers';
import {roomsFetchReducer, roomDetailsReducer, roomCreateReviewReducer, roomCreateReducer, roomUpdateReducer, roomDeleteReducer } from './reducers/RoomReducers';
import { bookingsFetchReducer, bookingDeleteReducer, roomBookingCheckReducer, bookingCreateReducer, bookedDatesReducer, BookingsMyReducer } from './reducers/BookingReducers';

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  profileUpdate: profileUpdateReducer,
  passwordUpdate: passwordUpdateReducer,
  usersFetch: usersFetchReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  roomsFetch: roomsFetchReducer,
  roomDetails: roomDetailsReducer,
  roomCreateReview: roomCreateReviewReducer,
  roomCreate: roomCreateReducer,
  roomUpdate: roomUpdateReducer,
  roomDelete: roomDeleteReducer,
  roomBookingCheck: roomBookingCheckReducer,
  bookingsFetch: bookingsFetchReducer,
  bookingDelete: bookingDeleteReducer,
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
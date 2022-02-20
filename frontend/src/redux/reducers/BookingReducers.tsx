import * as actions from '../constants/BookingConstants';
import { AnyAction } from 'redux'

export const roomBookingCheckReducer = (state = {}, action: AnyAction) => {

    switch (action.type) {
        case actions.CHECK_ROOM_BOOKING_REQUEST:
            return {
                loading: true,
            };
        case actions.CHECK_ROOM_BOOKING_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case actions.CHECK_ROOM_BOOKING_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case actions.CHECK_ROOM_BOOKING_RESET:
            return {}
        default:
            return state;
    }

}

export const bookingCreateReducer = (state = {}, action: AnyAction) => {

    switch (action.type) {
        case actions.CREATE_BOOKING_REQUEST:
            return {
                loading: true,
            };
        case actions.CREATE_BOOKING_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case actions.CREATE_BOOKING_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case actions.CREATE_BOOKING_RESET:
            return {}
        default:
            return state;
    }

}

export const bookedDatesReducer = (state = {}, action: AnyAction) => {

    switch (action.type) {
        case actions.GET_BOOKED_DATES_REQUEST:
            return {
                loading: true,
            };
        case actions.GET_BOOKED_DATES_SUCCESS:
            return {
                loading: false,
                bookedDates: action.payload
            };
        case actions.GET_BOOKED_DATES_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

}

export const BookingsMyReducer = (state = {}, action: AnyAction) => {

    switch (action.type) {
        case actions.GET_MY_BOOKINGS_REQUEST:
            return {
                loading: true,
            };
        case actions.GET_MY_BOOKINGS_SUCCESS:
            return {
                loading: false,
                myBookings: action.payload
            };
        case actions.GET_MY_BOOKINGS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

}

export const bookingsFetchReducer = (state = {}, action: AnyAction) => {

    switch (action.type) {
        case actions.FETCH_BOOKINGS_REQUEST:
            return {
                loading: true,
            };
        case actions.FETCH_BOOKINGS_SUCCESS:
            return {
                loading: false,
                bookings: action.payload.bookings,
                page: action.payload.page,
                pages: action.payload.pages,
                count: action.payload.count
            };
        case actions.FETCH_BOOKINGS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

}

export const bookingDeleteReducer = (state = {}, action: AnyAction) => {

    switch (action.type) {
        case actions.DELETE_BOOKING_REQUEST:
            return {
                loading: true,
            };
        case actions.DELETE_BOOKING_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case actions.DELETE_BOOKING_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

}
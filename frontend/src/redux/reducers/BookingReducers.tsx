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

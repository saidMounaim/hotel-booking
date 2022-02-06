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
        default:
            return state;
    }

}
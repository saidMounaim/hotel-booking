import { Dispatch } from "redux";
import axios from 'axios';
import * as actions from '../constants/BookingConstants';
import { IRoom } from "../../interfaces/IRoom";

export const checkRoomBooking = (id: IRoom['_id'], checkInDate: Date, checkOutDate: Date) => async (dispatch: Dispatch) => {

    try {
        dispatch({ type: actions.CHECK_ROOM_BOOKING_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/JSON",
            }
        }

        await axios.post(`/api/bookings/check`, {id, checkInDate, checkOutDate}, config);

        dispatch({ type: actions.CHECK_ROOM_BOOKING_SUCCESS });

    } catch (error: any) {
        dispatch({ 
            type: actions.CHECK_ROOM_BOOKING_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }

}

export const createBooking = (bookingData: {}) => async (dispatch: Dispatch, getState: any) => {

    try {
        dispatch({ type: actions.CREATE_BOOKING_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/JSON",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/bookings`, bookingData, config);

        console.log("SUCCESS");

        dispatch({ type: actions.CREATE_BOOKING_SUCCESS });

    } catch (error: any) {
        console.log(error.response.data.message);
        dispatch({ 
            type: actions.CREATE_BOOKING_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }

}
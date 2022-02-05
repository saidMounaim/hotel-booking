import axios from 'axios';
import { Dispatch } from 'redux';
import * as actions from '../constants/RoomConstants';
import { IRoom } from '../../interfaces/IRoom';

export const fetchRooms = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: actions.FETCH_ROOMS_REQUEST });

        const { data } = await axios.get("/api/rooms");

        dispatch({ type: actions.FETCH_ROOMS_SUCCESS, payload: data });
        
    } catch (error: any) {
        dispatch({ 
            type: actions.FETCH_ROOMS_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }
}

export const getRoomDetails = (id: IRoom['_id']) => async (dispatch: Dispatch) => {

    try {
        dispatch({ type: actions.ROOM_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/rooms/${id}`);
        dispatch({ type: actions.ROOM_DETAILS_SUCCESS, payload: data });

    } catch (error: any) {
        dispatch({ 
            type: actions.ROOM_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }

}
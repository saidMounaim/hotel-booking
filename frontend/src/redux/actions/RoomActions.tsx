import axios from 'axios';
import { Dispatch } from 'redux';
import * as actions from '../constants/RoomConstants';
import { IRoom, ICreateReview, TCreateRoom } from '../../interfaces/IRoom';

export const fetchRooms = (keyword: string, numOfBeds: number | string, roomType: string, currentPage: number) => 
async (dispatch: Dispatch) => {
    try {
        dispatch({ type: actions.FETCH_ROOMS_REQUEST });

        const { data } = 
        await axios.get(`/api/rooms/?keyword=${keyword}&numOfBeds=${numOfBeds}&roomType=${roomType}&pageNumber=${currentPage}`);

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

export const createRoomReview = (id: IRoom['_id'], review: ICreateReview) => async (dispatch: Dispatch, getState: any) => {

    try {
        dispatch({ type: actions.ROOM_CREATE_REVIEW_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/JSON",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/rooms/${id}/reviews`, review, config);
        dispatch({ type: actions.ROOM_CREATE_REVIEW_SUCCESS });

    } catch (error: any) {
        dispatch({ 
            type: actions.ROOM_CREATE_REVIEW_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }

}

export const createRoom = (roomData: TCreateRoom) => async (dispatch: Dispatch, getState: any) => {

    try {
        dispatch({ type: actions.CREATE_ROOM_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/JSON",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/rooms`, roomData, config);
        dispatch({ type: actions.CREATE_ROOM_SUCCESS });

    } catch (error: any) {
        dispatch({ 
            type: actions.CREATE_ROOM_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }

}

export const updateRoom = (roomId: IRoom['_id'], roomData: TCreateRoom) => async (dispatch: Dispatch, getState: any) => {

    try {
        
        dispatch({ type: actions.UPDATE_ROOM_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/JSON',
                'Authorization': `Bearer ${userInfo.token}`
            }
        };

        await axios.put(`/api/rooms/${roomId}`, roomData, config);
        dispatch({ type: actions.UPDATE_ROOM_SUCCESS });

    } catch (error: any) {
        dispatch({ 
            type: actions.UPDATE_ROOM_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }

}

export const deleteRoom = (roomId: IRoom['_id']) => async (dispatch: Dispatch, getState: any) => {

    try {
        dispatch({ type: actions.DELETE_ROOM_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/rooms/${roomId}`, config);
        dispatch({ type: actions.DELETE_ROOM_SUCCESS });

    } catch (error: any) {
        dispatch({ 
            type: actions.DELETE_ROOM_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }

}
import * as actions from '../constants/RoomConstants';
import { AnyAction } from 'redux'
import { IRoom } from '../../interfaces/IRoom';

const initialState: { rooms: IRoom[] } = {
    rooms: [],
};

export const roomsFetchReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case actions.FETCH_ROOMS_REQUEST:
            return {
                loading: true
            };
        case actions.FETCH_ROOMS_SUCCESS:
            return {
                loading: false,
                rooms: action.payload.rooms,
                count: action.payload.count
            };
        case actions.FETCH_ROOMS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const roomDetailsReducer = (state = { room: {} }, action: AnyAction) => {
    switch (action.type) {
        case actions.ROOM_DETAILS_REQUEST:
            return {
                loading: true
            };
        case actions.ROOM_DETAILS_SUCCESS:
            return {
                loading: false,
                room: action.payload
            };
        case actions.ROOM_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const roomCreateReviewReducer = (state = {}, action: AnyAction) => {
    switch (action.type) {
        case actions.ROOM_CREATE_REVIEW_REQUEST:
            return {
                loading: true
            };
        case actions.ROOM_CREATE_REVIEW_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case actions.ROOM_CREATE_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const roomCreateReducer = (state = {}, action: AnyAction) => {
    switch (action.type) {
        case actions.CREATE_ROOM_REQUEST:
            return {
                loading: true
            };
        case actions.CREATE_ROOM_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case actions.CREATE_ROOM_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actions.CREATE_ROOM_RESET:
            return {}
        default:
            return state;
    }
}

export const roomUpdateReducer = (state = {}, action: AnyAction) => {
    switch (action.type) {
        case actions.UPDATE_ROOM_REQUEST:
            return {
                loading: true
            };
        case actions.UPDATE_ROOM_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case actions.UPDATE_ROOM_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actions.UPDATE_ROOM_RESET:
            return {}
        default:
            return state;
    }
}

export const roomDeleteReducer = (state = {}, action: AnyAction) => {
    switch (action.type) {
        case actions.DELETE_ROOM_REQUEST:
            return {
                loading: true
            };
        case actions.DELETE_ROOM_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case actions.DELETE_ROOM_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actions.DELETE_ROOM_RESET:
            return {}
        default:
            return state;
    }
}
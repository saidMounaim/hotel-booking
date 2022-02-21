import * as actions from '../constants/UserConstants';
import { AnyAction } from 'redux'

export const userLoginReducer = (state = {}, action: AnyAction) => {

    switch (action.type) {
        case actions.USER_LOGIN_REQUEST:
            return {
                loading: true,
            };
        case actions.USER_LOGIN_SUCCESS:
            return {
                loading: false,
                success: true,
                userInfo: action.payload
            };
        case actions.USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case actions.USER_LOGOUT:
            return {
                loading: false,
                userInfo: null
            };
        default:
            return state;
    }

}

export const userRegisterReducer = (state = {}, action: any) => {

    switch (action.type) {
        case actions.USER_REGISTER_REQUEST:
            return {
                loading: true
            };
        case actions.USER_LOGIN_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case actions.USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

}

export const profileUpdateReducer = (state = {}, action: any) => {

    switch (action.type) {
        case actions.UPDATE_PROFILE_REQUEST:
            return {
                loading: true
            };
        case actions.UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case actions.UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

}

export const passwordUpdateReducer = (state = {}, action: any) => {

    switch (action.type) {
        case actions.UPDATE_PASSWORD_REQUEST:
            return {
                loading: true
            };
        case actions.UPDATE_PASSWORD_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case actions.UPDATE_PASSWORD_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

}

export const usersFetchReducer = (state = {}, action: any) => {

    switch (action.type) {
        case actions.FETCH_USERS_REQUEST:
            return {
                loading: true
            };
        case actions.FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload.users,
                page: action.payload.page,
                pages: action.payload.pages,
                count: action.payload.count,
            };
        case actions.FETCH_USERS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

}

export const userDetailsReducer = (state = {}, action: any) => {

    switch (action.type) {
        case actions.GET_USER_REQUEST:
            return {
                loading: true
            };
        case actions.GET_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload
            };
        case actions.GET_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

}

export const userUpdateReducer = (state = {}, action: any) => {

    switch (action.type) {
        case actions.UPDATE_USER_REQUEST:
            return {
                loading: true
            };
        case actions.UPDATE_USER_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case actions.UPDATE_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case actions.UPDATE_USER_RESET:
            return {}
        default:
            return state;
    }

}

export const userDeleteReducer = (state = {}, action: any) => {

    switch (action.type) {
        case actions.DELETE_USER_REQUEST:
            return {
                loading: true
            };
        case actions.DELETE_USER_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case actions.DELETE_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

}

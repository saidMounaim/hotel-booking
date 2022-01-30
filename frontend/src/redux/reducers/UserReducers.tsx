import * as actions from '../constants/UserConstants';

export const userLoginReducer = (state = {}, action: any) => {

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
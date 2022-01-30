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

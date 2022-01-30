import { Dispatch } from 'redux';
import * as actions from '../constants/UserConstants';
import axios from 'axios';

export const login = (user: {}) => async (dispatch: Dispatch) => {

    try {
        
        dispatch({ type: actions.USER_LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post("/api/users/login", user, config);

        dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error: any) {
        dispatch({
        type: actions.USER_LOGIN_FAIL,
        payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }

}

export const logout = () => (dispatch: Dispatch) => {

    dispatch({ type: actions.USER_LOGOUT });
    localStorage.removeItem("userInfo");

}

export const register = (user: {}) => async (dispatch: Dispatch) => {

    try {
        
        dispatch({ type: actions.USER_REGISTER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post("/api/users/register", user, config);

        dispatch({ type: actions.USER_REGISTER_SUCCESS });
        dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error: any) {
        dispatch({
        type: actions.USER_REGISTER_FAIL,
        payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }

}

export const updateProfile = (user: {}) => async (dispatch: Dispatch, getState: any) => {

    try {
        
        dispatch({ type: actions.UPDATE_PROFILE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put("/api/users/update", user, config);

        dispatch({ type: actions.UPDATE_PROFILE_SUCCESS });
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error: any) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "no token, no auth") {
            dispatch<any>(logout());
        }
        dispatch({
        type: actions.UPDATE_PROFILE_FAIL,
        payload: message
        });
    }

}
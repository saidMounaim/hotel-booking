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

export const logout = () => async (dispatch: Dispatch) => {

    dispatch({ type: actions.USER_LOGOUT });
    localStorage.removeItem("userInfo");

}
import { address } from "./server";
import axios from 'axios';

export const getUserResult = (studentId) => {
    return async (dispatch) => {
        const response = await axios.get(`${address}/api/user/result/${studentId}`);
        dispatch({
            type: 'GET_RESULT',
            payload: response.data,
        });
    }
}
export const clearQueryState = () => {
    return {
        type: 'CLEAR_QUERY_STATE',
    }
}
import axios from "axios";
import { address } from "./server";

export const getUserVouchers = (userId) => {
    return (dispatch) => {
        axios.get(address + "/api/user/voucher/" + userId)
            .then((response) => {
                dispatch({
                    type: "GET_USER_VOUCHER",
                    payload: response.data,
                });
            }
            )
            .catch((error) => {
                console.log(error, "ERROR IS HERE");
            }
            );
    }
}
export const clearQueryState = () => {
    return {
        type: "CLEAR_QUERY_STATE",
    }
}

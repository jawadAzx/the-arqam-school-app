import { address } from "./server";
import axios from 'axios';

export const getUserAttendance = (userId) => {
    console.log("UWU")
    return (dispatch) => {
        axios.get(address + "/api/user/attendance/" + userId)
            .then((response) => {
                dispatch({
                    type: "GET_USER_ATTENDANCE",
                    payload: response.data
                });
            }
            )
            .catch((error) => {
                console.log(error, "ERROR IS HERE");
            }
            );

    }
}

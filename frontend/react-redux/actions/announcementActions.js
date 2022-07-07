import axios from 'axios';
import { address } from "./server"

export const getAnnouncements = () => {
    return (dispatch) => {
        axios.get(address + "/api/announcement")
            .then((response) => {
                dispatch({
                    type: "GET_ANNOUNCEMENTS",
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

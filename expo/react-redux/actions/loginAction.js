import axios from "axios";
import { address } from "./server";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = (loginId, loginPassword) => {
    const body = {
        password: loginPassword,
        id: loginId,

    };
    return (dispatch) => {
        axios.post(address + "/api/user/login", body)
            .then((response) => {
                if (response.data === "User not found") {
                    dispatch({
                        type: "LOGIN_FAILED",
                        payload: response.data
                    });
                }
                else {
                    dispatch({
                        type: "LOGIN",
                        payload: response.data,
                    });
                }
            }
            )
            .catch((error) => {
                console.log(error, "ERROR IS HERE");
            }
            );

    }
}
export const logout = () => {
    return {
        type: "LOGOUT",
    }
}
export const retrieveUser = () => {
    return (dispatch) => {
        AsyncStorage.getItem("user")
            .then((user) => {
                if (user) {
                    dispatch({
                        type: "LOGIN",
                        payload: JSON.parse(user),
                    });
                }
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
        type: "CLEAR_QUERY_STATE"
    }
}

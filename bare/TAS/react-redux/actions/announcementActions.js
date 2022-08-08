import axios from 'axios';
import { address } from "./server"
import AsyncStorage from '@react-native-async-storage/async-storage';
export const getAnnouncements = () => {
    return async (dispatch) => {
        const announcements = await AsyncStorage.getItem('announcements');
        dispatch({
            type: "GET_ANNOUNCEMENTS",
            payload: announcements ? JSON.parse(announcements) : [],
        });
    }

}
export const getAnnouncementsBackend = () => {
    return async (dispatch) => {
        const response = await axios.get(address + '/api/announcement');
        if (AsyncStorage.getItem('announcements') === null) {
            AsyncStorage.setItem('announcements', JSON.stringify(response.data));
        }
        else {
            // delete old announcements
            const oldAnnouncements = await AsyncStorage.removeItem('announcements');
            // set new announcements
            await AsyncStorage.setItem('announcements', JSON.stringify(response.data));

        }
        dispatch({
            type: "GET_ANNOUNCEMENTS",
            payload: response.data,
        });
    }
}

export const addAnnouncements = (announcement) => {
    // store announcement in async storage
    return async (dispatch) => {
        const announcements = await AsyncStorage.getItem('announcements');
        // console.log(JSON.parse(announcements)[0]);
        // console.log("There",announcement)
        const newAnnouncements = announcements ? JSON.parse(announcements) : [];
        newAnnouncements.push(announcement);
        await AsyncStorage.setItem('announcements', JSON.stringify(newAnnouncements));

        dispatch({
            type: "ADD_ANNOUNCEMENTS",
            payload: newAnnouncements,
        });

    }
}
export const deleteAnnouncementsfromBackend = (id) => {
    return async (dispatch) => {
        const response = await axios.delete(address + '/api/announcement/' + id);
        dispatch({
            type: "DELETE_ANNOUNCEMENTS",
            payload: id
        });
    }
}
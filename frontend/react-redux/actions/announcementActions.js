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
            const announcements = await AsyncStorage.getItem('announcements');
            const announcementsNew = JSON.parse(announcements);
            const announcementsNew2 = response.data;
            announcementsNew2.forEach(announcement => {
                if (!announcementsNew.some(announcementOld => announcementOld.id === announcement.id)) {
                    announcementsNew.push(announcement);
                }
            }
            );
            AsyncStorage.setItem('announcements', JSON.stringify(announcementsNew));
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
        const newAnnouncements = announcements ? JSON.parse(announcements) : [];
        newAnnouncements.push(announcement[0]);
        await AsyncStorage.setItem('announcements', JSON.stringify(newAnnouncements));
        // also delet 
        dispatch({
            type: "ADD_ANNOUNCEMENTS",
            payload: "None"
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
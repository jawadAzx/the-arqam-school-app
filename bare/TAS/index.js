/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';


PushNotification.configure({

    onNotification: function (notification) {
        console.log("NOTIFICATION")


    },
    requestPermissions: Platform.OS === 'ios',


});
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!');
    // Customize notification here
    let title = remoteMessage["data"]["title"];
    let description = remoteMessage["data"]["body"];
    let time = remoteMessage["data"]["time"];
    let id = remoteMessage["data"]["id"];
    let date = remoteMessage["data"]["date"];

    let announcement = {
        title: title,
        description: description,
        time: time,
        id: id,
        date: date
    }
    const announcements = await AsyncStorage.getItem('announcements');
    console.log(JSON.parse(announcements)[0]);
    console.log("There",announcement)
    const newAnnouncements = announcements ? JSON.parse(announcements) : [];
    newAnnouncements.push(announcement);
    await AsyncStorage.setItem('announcements', JSON.stringify(newAnnouncements));
    PushNotification.localNotification({
        channelId: "default",
        title: title,
        message: description,
        soundName: 'default',
        playSound: true,
        vibrate: true,
    });

});

AppRegistry.registerComponent(appName, () => App);

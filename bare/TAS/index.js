/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';

PushNotification.configure({

    onNotification: function (notification) {
        console.log("NOTIFICATION")


    },
    requestPermissions: Platform.OS === 'ios',


});
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    // Customize notification here
    let title = remoteMessage["data"]["title"];
    let body = remoteMessage["data"]["body"];


    PushNotification.localNotification({
        channelId: "default",
        title: title,
        message: body,
        soundName: 'default',
        playSound: true,
        vibrate: true,
    });
});

AppRegistry.registerComponent(appName, () => App);

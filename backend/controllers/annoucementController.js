'use strict';
const firebase = require('../db');
const firestore = firebase.firestore();

const addAnnouncementNotification = async (req, res, next) => {
    try {
        let data = req.body;
        let date = new Date();
        let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        // add date and time to data
        // need to change date according to format 2022-07-04, current 4-7-2022
        data.date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        data.time = time;
        let id = 0
        // get latest announcement 
        const data2 = await firestore.collection('announcements').get()
        if (data2.docs.length > 0) {
            id = data2.docs.length;
        }
        data.id = id;
        let notification = {
            id: id,
            title: data.title,
            description: data.description,
            date: data.date,
            time: data.time,
            read: false
        }
        const users = await firestore.collection('users').where('type', '==', 'student').get();
        // add notification to each user
        users.docs.forEach(async (user) => {
            let notifications = await firestore.collection('notifications').doc(user.id).get();
            // if undefined then create new array
            notifications = notifications.data()["data"]
            if (notifications === undefined) {
                notifications = [];
            }
            if (notifications.length > 0) {
                notifications.push(notification);
            }
            else {
                notifications = [notification];
            }
            await firestore.collection('notifications').doc(user.id).update({
                'data': notifications
            });
        }
        )
        await firestore.collection('announcements').doc(id.toString()).set(data);
        res.send("Announcement added successfully");

    } catch (error) {
        res.status(400).send(error.message);
    }
}


const getAnnouncements = async (req, res, next) => {
    try {
        const data = await firestore.collection('announcements').get();
        res.send(data.docs.map(doc => doc.data()));
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const deleteNotifications = async (req, res, next) => {
    console.log("HERE")
    try {
        const data = await firestore.collection('notifications').doc(req.params.id).get();
        let notifications = data.data()["data"];
        notifications = []
        await firestore.collection('notifications').doc(req.params.id).update({
            'data': notifications
        });
        res.send("Notification deleted successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addAnnouncementNotification,
    getAnnouncements,
    deleteNotifications
}
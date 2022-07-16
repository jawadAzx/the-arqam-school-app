'use strict';
const firebase = require('../db');
const firestore = firebase.firestore();

const addAnnouncement = async (req, res, next) => {
    try {
        let data = req.body;
        let date = new Date();
        let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        // add date and time to data
        // need to change date according to format 2022-07-04, current 4-7-2022
        data.date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        data.time = time;
        let id = 0
        const data2 = await firestore.collection('announcements').get();
        if (data2.docs.length > 0) {
            id = data2.docs.length ;
        }
        data.id = id;
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


module.exports = {
    addAnnouncement,
    getAnnouncements
}
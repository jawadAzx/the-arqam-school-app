'use strict';
const firebase = require('../db');
const firestore = firebase.firestore();

const addAnnouncement = async (req, res, next) => {
    try {
        let data = req.body;
        let date = new Date();
        let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        // add date and time to data
        // data.date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        data.time = time;
        await firestore.collection('announcements').add(data);
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
'use strict';
const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firestore();
// get FieldValue
const FieldValue = require('firebase-admin').firestore.FieldValue;
const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        console.log(data["id"])
        const id = data["id"];
        await firestore.collection('users').doc(id).set(data);
        res.send("Added successfully");

    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getUser = async (req, res, next) => {
    try {
        const data = await firestore.collection('users').get();
        res.send(data.docs.map(doc => doc.data()));
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getUserById = async (req, res, next) => {
    try {
        const data = await firestore.collection('users').doc(req.params.id).get();
        res.send(data.data());
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const loginUser = async (req, res, next) => {
    try {
        const data = req.body;
        const id = data["id"];
        const user = await firestore.collection('users').doc(id).get();
        if (user.exists && user.data().password === data.password) {
            res.send(user.data());
        } else {
            res.send("User not found");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const updateAttendace = async (req, res, next) => {
    try {
        const data = req.body;
        const id = data["id"];
        const attendanceType = data["attendanceType"];
        const user = await firestore.collection('users').doc(id).get();
        if (user.exists) {
            if (attendanceType === "present") {
                let dates = user.data()["presentDates"];
                dates = dates + ", " + data["newDate"]
                await firestore.collection('users').doc(id).update({
                    "presentDates": dates
                });
            } else if (attendanceType === "absent") {
                let dates = user.data()["absentDates"];
                dates = dates + ", " + data["newDate"]
                await firestore.collection('users').doc(id).update({
                    "absentDates": dates
                });
            }
            else if (attendanceType === "leave") {
                let dates = user.data()["leaveDates"];
                dates = dates + ", " + data["newDate"]
                await firestore.collection('users').doc(id).update({
                    "leaveDates": dates
                });
            }
            res.send("Updated successfully");

        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getUserAttendance = async (req, res, next) => {
    try {
        const data = await firestore.collection('users').doc(req.params.id).get();
        const pDays = data.data()["presentDates"];
        const aDays = data.data()["absentDates"];
        const lDays = data.data()["leaveDates"];
        const attendanceRecord = {
            "presentDates": pDays,
            "absentDates": aDays,
            "leaveDates": lDays
        }
        res.send(attendanceRecord);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addUser,
    getUser,
    getUserById,
    loginUser,
    updateAttendace,
    getUserAttendance
}
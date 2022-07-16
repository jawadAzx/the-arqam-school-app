'use strict';
const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firestore();
require("firebase/storage");
const storage = firebase.storage().ref();
global.XMLHttpRequest = require("xhr2");


// Add Image to Storage and return the file path
const uploadVoucher = async (req, res) => {
    try {
        const id = req.body.id
        console.log(id)
        const file = req.file;
        const name = file.originalname.split(".")[0];
        const type = file.originalname.split(".")[1];
        const fileName = `${name}.${type}`;
        // Step 1. Create reference for file name in cloud storage 
        const fileRef = storage.child(fileName);
        // Step 2. Upload the file in the bucket storage
        const snapshot = await fileRef.put(file.buffer);
        // Step 3. Grab the public url
        const downloadURL = await snapshot.ref.getDownloadURL();
        // get month
        const month = new Date().getMonth() + 1;
        // get year
        const year = new Date().getFullYear();
        let voucherForMonth = month + "-" + year;
        // get voucher for month
        let voucher = await firestore.collection('users').doc(id).get();
        voucher = voucher.data()["vouchers"];
        const newData =
        {
            "voucherForMonth": voucherForMonth,
            "voucherURL": downloadURL

        }
        if (voucher == null ) {
            await firestore.collection('users').doc(id).update({
                "vouchers": [newData]
            })
        }
        else {


            // append newData to voucher array
            voucher.push(newData);
            // update voucher array in database
            await firestore.collection('users').doc(id).update({
                "vouchers": voucher
            });
        }
        res.send("Uploaded successfully");
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}


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
    getUserAttendance,
    uploadVoucher
}
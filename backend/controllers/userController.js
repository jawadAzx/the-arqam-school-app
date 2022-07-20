'use strict';
const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firestore();
require("firebase/storage");
const storage = firebase.storage().ref();
global.XMLHttpRequest = require("xhr2");

// Add Image to Storage and return the file path
const uploadResult = async (req, res) => {
    try {
        const id = req.body.studentId
        const studentClass = req.body.studentClass
        const term = req.body.term
        const file = req.file;
        const name = file.originalname.split(".")[0];
        const type = file.originalname.split(".")[1];
        const fileName = `${name}.${type}`;
        // // Step 1. Create reference for file name in cloud storage 
        const fileRef = storage.child(fileName);
        // // Step 2. Upload the file in the bucket storage
        const snapshot = await fileRef.put(file.buffer);
        // // Step 3. Grab the public url
        const downloadURL = await snapshot.ref.getDownloadURL();

        let results = await firestore.collection('users').doc(id).get();
        results = results.data()["results"];

        const newData =
        {
            "resultForClass": studentClass,
            "resultUrl": downloadURL,
            "resultForTerm": term,
        }

        if (results.length == 0) {
            await firestore.collection('users').doc(id).update({
                "results": [newData]
            })
        }
        else {

            // append newData to voucher array
            results.push(newData);
            // update voucher array in database
            await firestore.collection('users').doc(id).update({
                "results": results
            });
        }
        res.send("Uploaded successfully");
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}


const uploadVoucher = async (req, res) => {
    try {
        const id = req.body.studentId
        const file = req.file;
        const tutionFee = req.body.tutionFee;
        const admissionFee = req.body.admissionFee;
        const regFee = req.body.regFee;
        const examinationFee = req.body.examinationFee;
        const discount = req.body.discount;
        const arrears = req.body.arrears;
        const payable = req.body.payable;

        const name = file.originalname.split(".")[0];
        const type = file.originalname.split(".")[1];
        const fileName = `${name}.${type}`;
        // // Step 1. Create reference for file name in cloud storage 
        const fileRef = storage.child(fileName);
        // // Step 2. Upload the file in the bucket storage
        const snapshot = await fileRef.put(file.buffer);
        // // Step 3. Grab the public url
        const downloadURL = await snapshot.ref.getDownloadURL();
        // // get month
        const month = new Date().getMonth() + 1;
        // // get year
        const year = new Date().getFullYear();
        let voucherForMonth = month + "-" + year;
        // // get voucher for month
        let voucher = await firestore.collection('users').doc(id).get();
        voucher = voucher.data()["vouchers"];
        const newData =
        {
            "voucherForMonth": voucherForMonth,
            "voucherURL": downloadURL,
            "tutionFee": tutionFee,
            "admissionFee": admissionFee,
            "regFee": regFee,
            "examinationFee": examinationFee,
            "discount": discount,
            "arrears": arrears,
            "payable": payable
        }
        if (voucher.length == 0) {
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

const getUserVoucher = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await firestore.collection('users').doc(id).get();
        const vouchers = user.data()["vouchers"];
        res.send(vouchers);
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}



const addUser = async (req, res, next) => {
    try {
        const data = req.body;
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
        const cls = data["className"] + "-" + data["classSection"];
        const ids = data["classStudentsIds"];
        const attendance = data["attendance"];
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        let dateString = year + "-" + month + "-" + day;

        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const attendanceType = attendance[i];
            const user = await firestore.collection('users').doc(id).get();
            if (user.exists) {
                let dates = user.data()
                if (attendanceType === "Present") {
                    dates = dates["presentDates"];
                    if (dates === "") {
                        dates = dateString;
                    }
                    else {

                        dates = dates + "," + dateString
                    }
                    await firestore.collection('users').doc(id).update({
                        "presentDates": dates
                    });
                } else if (attendanceType === "Absent") {
                    dates = dates["absentDates"];
                    if (dates === "") {
                        dates = dateString;
                    }
                    else {

                        dates = dates + "," + dateString
                    }
                    await firestore.collection('users').doc(id).update({
                        "absentDates": dates
                    });
                }
                else if (attendanceType === "Leave") {
                    dates = dates["leaveDates"];
                    if (dates === "") {
                        dates = dateString;
                    }
                    else {
                        dates = dates + "," + dateString
                    }
                    await firestore.collection('users').doc(id).update({
                        "leaveDates": dates
                    });
                }

            }
        }
        res.send("Updated successfully");

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

const getClassByClassIdAttendance = async (req, res, next) => {
    try {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        let dateString = year + "-" + month + "-" + day;
        const classId = req.params.id;
        const data = await firestore.collection('users').get();
        const users = data.docs.map(doc => doc.data());
        const classUsers = users.filter(user => user.grade + "-" + user.section === classId && user.type === "student");
        let hmm = classUsers[0]
        let presentDates = hmm["presentDates"].split(",");
        let absentDates = hmm["absentDates"].split(",");
        let leaveDates = hmm["leaveDates"].split(",");
        // check if dateString is in presentDates

        let marked = false
        for (let i = 0; i < presentDates.length; i++) {
            if (presentDates[i] === dateString || absentDates === dateString || leaveDates === dateString) {
                marked = true;
            }
        }
        if (marked) {
            res.send("Already updated");
        }
        else {
            res.send(classUsers);
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getClassByClassId = async (req, res, next) => {
    try {
        const classId = req.params.id;
        const data = await firestore.collection('users').get();
        const users = data.docs.map(doc => doc.data());
        const classUsers = users.filter(user => user.grade + "-" + user.section === classId && user.type === "student");
        res.send(classUsers);
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
    uploadVoucher,
    getUserVoucher,
    getClassByClassIdAttendance,
    getClassByClassId,
    uploadResult
}
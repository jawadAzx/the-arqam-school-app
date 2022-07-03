'use strict';
const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firestore();

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

module.exports = {
    addUser,
    getUser,
    getUserById
}
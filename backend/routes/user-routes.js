const express = require('express');
const { addUser, getUser, getUserById } = require('../controllers/userController');

const router = express.Router();

router.post("/user", addUser)
router.get("/user", getUser)
router.get("/user/:id", getUserById)
// what link to get user by id

module.exports = router
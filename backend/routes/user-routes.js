const express = require('express');
const { addUser, getUser, getUserById, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post("/", addUser)
router.post("/login", loginUser)

router.get("/", getUser)
router.get("/:id", getUserById)
// what link to get user by id

module.exports = router
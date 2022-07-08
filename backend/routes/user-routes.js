const express = require('express');
const { addUser, getUser, getUserById, loginUser, updateAttendace, getUserAttendance } = require('../controllers/userController');

const router = express.Router();

router.post("/", addUser)
router.post("/login", loginUser)
router.post("/attendance", updateAttendace)

router.get("/", getUser)
router.get("/:id", getUserById)
router.get("/attendance/:id", getUserAttendance)
// what link to get user by id

module.exports = router
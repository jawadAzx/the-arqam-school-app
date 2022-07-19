const express = require('express');
const multer = require('multer');

const { addUser, getUser, getUserById, loginUser, updateAttendace, getUserAttendance, uploadVoucher,
    getUserVoucher, getClassByClassId
} = require('../controllers/userController');

const router = express.Router();

// Setting up multer as a middleware to grab photo uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

router.post("/", addUser)
router.post("/login", loginUser)
router.post("/attendance", updateAttendace)
router.post("/uploadVoucher", upload, uploadVoucher)

router.get("/", getUser)
router.get("/:id", getUserById)
router.get("/attendance/:id", getUserAttendance)
router.get("/voucher/:id", getUserVoucher)
router.get("/class/:id", getClassByClassId)
// what link to get user by id

module.exports = router
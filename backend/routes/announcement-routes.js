const express = require('express');
const { addAnnouncement, getAnnouncements } = require('../controllers/annoucementController');
const router = express.Router();

router.post("/", addAnnouncement)
router.get("/", getAnnouncements)

module.exports = router
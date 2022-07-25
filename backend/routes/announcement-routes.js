const express = require('express');
const { addAnnouncementNotification, getAnnouncements, deleteNotifications } = require('../controllers/annoucementController');
const router = express.Router();

router.post("/", addAnnouncementNotification)

// router.post("/")
router.get("/", getAnnouncements)
router.delete("/:id", deleteNotifications)

module.exports = router
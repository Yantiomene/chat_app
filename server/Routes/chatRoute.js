const express = require("express");
const {
  createChat,
  findUserChats,
  findChat,
} = require("../Controllers/chatController");
const router = express.Router();

router.post("/create", createChat);
router.get("/find/:userId", findUserChats);
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;

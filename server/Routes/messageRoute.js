const express = require("express");

const {
  createMessage,
  getMessages,
} = require("../Controllers/messageController");

const router = express.Router();

router.post("/create", createMessage);
router.get("/:chatId", getMessages);

module.exports = router;

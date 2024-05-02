const messageModel = require("../Models/messageModel");

// create Message
exports.createMessage = async (req, res) => {
  const { chatId, senderId, message } = req.body;

  try {
    const newMessage = new messageModel({
      chatId,
      senderId,
      message,
    });

    const response = await newMessage.save();
    res.status(201).json({ success: true, response });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};

// Get messages
exports.getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await messageModel.find({ chatId });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

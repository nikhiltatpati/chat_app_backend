const mongoose = require("mongoose");

const ChatsSchema = new mongoose.Schema({
  chat_id: {
    type: String,
    required: true,
  },
  chat_name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  chat_room: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  chats: [
    {
      userId: { type: String },
      username: { type: String },
      time: { type: String },
      msg: { type: String },
    },
  ],
});

module.exports = mongoose.model("Chat", ChatsSchema);

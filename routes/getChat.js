const router = require("express").Router();

const Chat = require("../models/Chats.js");

const auth = require("../verifyToken");

router.post("/getChat", auth, async (req, res) => {
  Chat.findOne({ chat_id: req.body.chatId }).then(function (results) {
    res.send({
      chat_name: results.chat_name,
      chat: results.chats,
      room_code: results.chat_room,
    });
  });
});

module.exports = router;

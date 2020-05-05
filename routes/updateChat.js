const router = require("express").Router();

const Chat = require("../models/Chats.js");

const auth = require("../verifyToken");

router.post("/updateChat", auth, async (req, res) => {
  Chat.update(
    { chat_id: req.body.chatId },
    {
      $push: {
        chats: {
          userId: req.body.userId,
          username: req.body.username,
          time: req.body.time,
          msg: req.body.msg,
        },
      },
    }
  ).then(() => {
    res.send({ success: "success" });
  });
});

module.exports = router;

const router = require("express").Router();

const Chat = require("../models/Chats.js");
const User = require("../models/User.js");

const auth = require("../verifyToken");

router.post("/joinChat", auth, async (req, res) => {
  Chat.findOne({ chat_room: req.body.roomCode }).then(function (results) {
    console.log(results);
    User.update(
      { _id: req.user._id },
      {
        $push: {
          active_chats: results.chat_id,
        },
      }
    ).then(() => {
      res.send({
        id: results.chat_id,
        chatName: results.chat_name,
        success: "success",
      });
    });
  });
});

module.exports = router;

const router = require("express").Router();

const Chat = require("../models/Chats.js");
const User = require("../models/User.js");

const auth = require("../verifyToken");

router.post("/leaveChat", auth, async (req, res) => {
  const id = req.body.chatId;
  User.update(
    { _id: req.user._id },
    {
      $pull: {
        active_chats: id,
      },
    }
  ).then(function () {
    res.send({ success: "success" });
  });
});

module.exports = router;

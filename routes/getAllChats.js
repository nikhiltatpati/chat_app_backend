const router = require("express").Router();

const Chat = require("../models/Chats.js");
const User = require("../models/User.js");

const auth = require("../verifyToken");

router.post("/getAll", auth, async (req, res) => {
  var user = await User.findOne({ _id: req.user._id });

  var promises = user.active_chats.map(function (chatId) {
    return Chat.findOne({ chat_id: chatId }).then(function (results) {
      return {
        id: results.chat_id,
        name: results.chat_name,
      };
    });
  });
  Promise.all(promises).then(function (results) {
    res.send(results);
  });
});

module.exports = router;

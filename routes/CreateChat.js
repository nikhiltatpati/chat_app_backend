const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const Chat = require("../models/Chats.js");
const User = require("../models/User.js");

const auth = require("../verifyToken");

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.post("/create", auth, async (req, res) => {
  const roomId = makeid(8);
  //Check if User already exists
  if (!req.body.chat_name)
    return res.status(400).send({ error: "Name cannot be empty" });

  const roomExist = await Chat.findOne({ room_code: roomId });
  if (roomExist)
    return res
      .status(400)
      .send({ error: "Error occured while creating room! Try Again" });

  const chat = new Chat({
    chat_id: uuidv4(),
    chat_room: roomId,
    chat_name: req.body.chat_name,
    chats: [],
  });

  User.findOne({ _id: req.user._id }).then(function (user) {
    var chats = [chat.chat_id, ...user.active_chats];
    User.update(
      { _id: req.user._id },
      {
        $set: {
          active_chats: chats,
        },
      }
    ).then(function (params) {
      console.log(params);
    });
  });

  try {
    await chat.save();
    res.send({ chat_id: chat.chat_id, chat_room: chat.chat_room });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;

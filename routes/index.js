const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { loginValidation, registrationValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  //Validate before
  const { error } = registrationValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  //Check if User already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send({ error: "Email already exists" });

  //hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  //Validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  //Check if User already exists
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ error: "Email or password is wrong" });
  //Password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({ error: "Email or password is wrong" });

  //Create and Assign Token
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  //res.header("auth-token", token).send(token);
  res.send({ userId: user._id, username: user.name, success: token });
});

module.exports = router;

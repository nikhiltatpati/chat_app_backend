const router = require("express").Router();

const auth = require("../verifyToken");

router.post("/", auth, (req, res) => {
  res.json({ posts: { title: "my first posts" } });
});

module.exports = router;

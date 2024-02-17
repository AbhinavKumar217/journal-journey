const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  } else {
    res.status(401).json("You can only update your account!");
    return;
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
        return;
      } catch (err) {
        res.status(500).json(err);
        return;
      }
    } catch (err) {
      res.status(404).json("User not found!");
      return;
    }
  } else {
    res.status(401).json("You can only delete your account!");
    return;
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...visibleUser } = user._doc;
    res.status(200).json(visibleUser);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//GET ALL
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
    return;
  } catch (error) {
    res.status(500).json(err);
    return;
  }
})

module.exports = router;

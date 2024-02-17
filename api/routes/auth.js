const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const usernameExist = await User.findOne({ username: req.body.username });
    if (usernameExist) {
      res.status(400).json("Username already occupied!");
      return;
    }

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      res.status(400).json("Email already occupied!");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(req.body.password)) {
      res
        .status(400)
        .json(
          "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long."
        );
      return;
    }

    const user = await newUser.save();
    const { password, ...visibleUser } = user._doc;
    res.status(200).json(visibleUser);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).json("Invalid username!");
      return;
    }

    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      res.status(400).json("Invalid password!");
      return;
    }

    const { password, ...visibleUser } = user._doc;
    res.status(200).json(visibleUser);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

module.exports = router;

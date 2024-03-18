const express = require("express");

const router = express.Router();

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email) {
      return res.status(400).json("You must specify a username and an email");
    }

    // cherchons avant de créer l'utilisateur si nous n'avons pas dans notre BDD DEJA un utilisateur avec ce mail :

    const existingUser = await User.findOn({ email: email });
    if (existingUser) {
      return res.status(409).json("This email is not available");
    }

    const newUser = new User({
      email: email,
      username: username,
    });
    newUser.save();
    return res.status(201).json({
      _id: newUser._id,
      token: newUser.token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/user/login", (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const express = require("express");

const router = express.Router();

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json("You must specify a username and an email");
    }

    // // cherchons avant de créer l'utilisateur si nous n'avons pas dans notre BDD DEJA un utilisateur avec ce mail :

    const existingUser = await User.findOne({
      email: email,
      username: username,
    });
    if (existingUser) {
      return res.status(409).json("This email is not available");
    }

    // await newUser.save();
    // res.status(200).json({ message: "new task User" });
    // // return res.status(201).json({
    // //   _id: newUser._id,
    // //   token: newUser.token,
    // // });

    const newUser = new User({ email: email, username: username });

    await newUser.save();

    // console.log(newTache);
    res.status(200).json({ message: "new user created" });
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

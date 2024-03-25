const express = require("express");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const router = express.Router();

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email) {
      return res.status(400).json("You must specify a username and an email");
    }

    // // cherchons avant de créer l'utilisateur si nous n'avons pas dans notre BDD DEJA un utilisateur avec ce mail :

    const existingUser = await User.findOne({
      email: email,
    });
    if (existingUser) {
      return res.status(409).json("This email is not available");
    }

    const salt = uid2(16);

    const hash = encBase64.stringify(SHA256(password + salt));

    const token = uid2(24);

    // await newUser.save();
    // res.status(200).json({ message: "new task User" });
    // // return res.status(201).json({
    // //   _id: newUser._id,
    // //   token: newUser.token,
    // // });

    const newUser = new User({
      email: email,
      username: username,
      token: token,
      hash: hash,
      salt: salt,
    });

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      token: newUser.token,
      username: newUser.username,
    });

    // console.log(newTache);
    res.status(200).json({ message: "new user created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("You must specify a username and an email");
    }

    const userFound = await User.findOne({ email: email });

    console.log(userFound);

    if (!userFound) {
      res.status(409).json("This email and password are not available");
    }

    const saltPassword = password + userFound.salt;

    const newHash = encBase64.stringify(SHA256(saltPassword));

    if (newHash === userFound.hash) {
      return res.status(20).json({
        _id: userFound._id,
        token: userFound.token,
        username: userFound.username,
      });
    } else {
      res.status(401).json("This email is not available");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

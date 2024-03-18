const mangoose = require("mongoose");

const User = mangoose.model("User", {
  email: String,
  username: String,
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;

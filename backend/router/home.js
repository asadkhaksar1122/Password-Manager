const express = require("express");
const router = express.Router();
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const { User } = require("../models/user");
require("dotenv").config();
router.get("/", (req, res) => {
  res.send("some api settign");
});
router.post("/signup", async function (req, res) {
  try {
    let { name, email, password } = req.body;
    password = await bcrypt.hash(password, 10);
    let user = new User({
      fullname: name,
      email,
      password,
    });
    let saveduser = await user.save();
    let token = jwt.sign({ _id: saveduser._id }, process.env.SECRET, {
      algorithm: "HS512",
    });
    console.log(saveduser);
    res.json({ token: token });
  } catch (error) {
    if (error.name === "MongoServerError") {
      return res.json({
        errorname: error.name,
        message: "The email has been already taken",
      });
    }
    res.json({ errorname: error.name, message: error.message });
  }
});

router.post("/login", async function (req, res) {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    let validuser = await bcrypt.compare(password, user.password);
    if (validuser) {
      let token = jwt.sign({ _id: user._id }, process.env.SECRET, {
        algorithm: "HS512",
      });
      console.log(token);
      res.json({ token: token, secretkey: user.secretkey });
    } else {
      res.json({
        errorname: "validation error",
        message: "invalid password or email",
      });
    }
  } else {
    res.json({
      errorname: "validation error",
      message: "invalid password or email",
    });
  }
});

router.post("/secretkey", async function (req, res) {
  try {
    let { token, secretkey } = req.body;
    let decoded = jwt.verify(token, process.env.SECRET);
    let user = await User.findById(decoded._id);
    let hashsecretkey = await bcrypt.hash(secretkey, 10);
    user.secretkey = hashsecretkey;
    let saveduser = await user.save();
    res.json(saveduser.secretkey);
  } catch (error) {
    res.json({ errormessage: error.message, errorname: error.name });
  }
});

module.exports = router;

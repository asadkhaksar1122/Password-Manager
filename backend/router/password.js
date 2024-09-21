const express = require("express");
let jwt = require("jsonwebtoken");
const router = express.Router();

const { encrypt } = require("../helper/helper");
const { Password } = require("../models/model");
require("dotenv").config();
router.post("/newpassword", async (req, res) => {
  let { websiteurl, username, password, token } = req.body;
  let encryptedpassword = encrypt(password, process.env.PASSWORD_SECRET);
  let { _id } = jwt.verify(token, process.env.SECRET);
  let newpassword = new Password({
    websiteurl,
    username,
    password: encryptedpassword,
    owner: _id,
  });
  let savedpassword = await newpassword.save();
  console.log(savedpassword);
  res.json(savedpassword);
});

router.post("/allpassword", async function (req, res) {
  let { token } = req.body;
  let { _id } = jwt.verify(token, process.env.SECRET);
  let passwords = await Password.find({ owner: _id });
  res.json(passwords);
});

router.delete("/deletepassword/:id", async function (req, res) {
  try {
    let { id } = req.params;
    let { token } = req.body;
    let { _id } = jwt.verify(token, process.env.SECRET);
    let password = await Password.findById(id);
    if (password.owner != _id) {
      return res.status(401).json({
        errorname: "Authentication error",
        errormessage: "you are not the owner of this password",
      });
    }
    let deletedpassword = await Password.findByIdAndDelete(id);
    res.json(deletedpassword);
  } catch (error) {
    res.json({ errormessage: error.message, errorname: error.name });
  }
});
router.post("/editpassword/:id", async function (req, res) {
  try {
    let { token } = req.body;
    let { id } = req.params;
    let { _id } = jwt.verify(token, process.env.SECRET);
    let password1 = await Password.findById(id);

    if (!password1) {
      return res.status(404).json({
        errorname: "Not found error",
        errormessage: "Password not found",
      });
    }
    if (password1.owner != _id) {
      return res.status(401).json({
        errorname: "Authentication error",
        errormessage: "You are not the owner of this password",
      });
    }
    res.json(password1);
  } catch (error) {
    res
      .status(500)
      .json({ errorname: error.name, errormessage: error.message });
  }
});
router.put("/editpassword/:id", async function (req, res) {
  try {
    let { token, websiteurl, username, password } = req.body;
    let { id } = req.params;
    let { _id } = jwt.verify(token, process.env.SECRET);
    let encryptedpassword = encrypt(password, process.env.PASSWORD_SECRET);
    let password1 = await Password.findById(id);
    console.log(password1);
    if (!password1) {
      return res.status(404).json({
        errorname: "Not found error",
        errormessage: "Password not found",
      });
    }
    if (password1.owner != _id) {
      return res.status(401).json({
        errorname: "Authentication error",
        errormessage: "You are not the owner of this password",
      });
    }
    let updatedpassword = await Password.findByIdAndUpdate(id, {
      websiteurl,
      username,
      password: encryptedpassword,
    });
    res.json(updatedpassword);
  } catch (error) {
    res
      .status(500)
      .json({ errorname: error.name, errormessage: error.message });
  }
});

module.exports = router;

const express = require("express");
const api = express();
api.use(express.json());
var bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");
var jwt = require("jsonwebtoken");
var jwtSecret = require("./config/JWT").secret;

exports.registerUser = async (req, res, next) => {
  try {
    let { rollNo, name, email, password, type } = req.body;
    var hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    let user = new User({
      name,
      rollNo,
      email,
      password: hashedPassword,
      type: type || "V",
    });
    await user.save();
    return res.status(200).json({
      success: true,
      message: "User added",
    });
  } catch (error) {
    console.error("registerUser:", error);
    return res.status(500).json({
      success: false,
      msg: "Invalid data",
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    console.log("worked");
    let { rollNo, password } = req.body;
    let hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

    let user = await User.findOne({ rollNo });
    if (user) {
      console.log("User found");
      let validPassword = bcrypt.compareSync(password, user.password);
      if (validPassword) {
        let userObj = {
          name: user.name,
          rollNo: user.rollNo,
          _id: user._id,
          type: user.type,
          email: user.email,
        };
        let token = jwt.sign(userObj, jwtSecret);
        return res.status(200).json({
          success: true,
          user,
          token,
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Inavlid password",
        });
      }
    } else {
      console.log("User not found");
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("loginUser:", error);
    return res.status(500).json({
      success: false,
      msg: "Invalid data",
    });
  }
};

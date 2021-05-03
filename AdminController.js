const express = require("express");
const api = express();
api.use(express.json());
const mongoose = require("mongoose");
const Poll = mongoose.model("Poll");
const User = mongoose.model("User");

exports.getAllUsers = async (req, res, next) => {
  try {
    let users = await User.find({ type: "V" });
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getAllPolls = async (req, res, next) => {
  try {
    let polls = await Poll.find({});
    return res.status(200).json({
      success: true,
      polls,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.createPoll = async (req, res, next) => {
  try {
    let { name, candidates } = req.body;
    let stats = [];
    let status = "polling";

    candidates.forEach((candidate) => {
      stats.push({
        candidateId: candidate.id,
        candidateName: candidate.candidateName,
        votes: 0,
      });
    });

    let poll = new Poll({
      name,
      candidates,
      stats,
      status,
    });
    await poll.save();
    return res.status(200).json({
      success: true,
      message: "poll added",
    });
  } catch (e) {
    console.log(e);
  }
};



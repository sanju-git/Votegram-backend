const express = require("express");
const api = express();
api.use(express.json());
const mongoose = require("mongoose");
const Poll = mongoose.model("Poll");
const Vote = mongoose.model("Vote");
const User = mongoose.model("User");
var nodemailer = require("nodemailer");

exports.getCandidates = async (req, res, next) => {
  try {
    let pollId = req.params.pollId;
    let voterId = req.user._id;
    let isVoted = await Vote.findOne({ voterId, pollId });
    if (isVoted) {
      return res.status(200).json({
        success: true,
        message:
          "Your vote has been casted.You cannot cast vote anymore for this election!",
      });
    }
    let poll = await Poll.findOne({ _id: pollId });
    console.log(poll.candidates);
    return res.status(200).json({
      success: true,
      candidates: poll.candidates,
    });
  } catch (e) {
    console.error("getCandidates:", error);
    return res.status(500).json({
      success: false,
    });
  }
};

exports.castVote = async (req, res, next) => {
  try {
    let voterId = req.user._id;
    let email = req.user.email || "sanjvasn@gmail.com";
    let { candidateId, pollId } = req.body;
    let vote = new Vote({
      voterId,
      candidateId,
      pollId,
    });

    await vote.save();

    updatePoll(pollId, candidateId);

    mailVoter(email, candidateId, pollId);

    return res.status(200).json({
      success: true,
      message: "vote added",
    });
  } catch (e) {
    console.error("catVote:", error);
    return res.status(500).json({
      success: false,
    });
  }
};

async function mailVoter(email, candidateId, pollId) {
  // let { email } = req.query;
  // console.log(email);
  let candidate = await User.findOne({ _id: candidateId });
  let poll = await Poll.findOne({ _id: pollId });

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      //   user: mailID,
      // pass: password,
    },
  });
  let mailOptions = {
    // from: mailid,
    to: email,
    subject: "Votegram - Poll Vote information",
    text:
      "Your vote for " +
      candidate.name +
      " on the " +
      poll.name +
      " election has been recorded. Soon You'll be notified about the results.",
  };
  sendmail(mailOptions, transporter);
}

async function sendmail(mailOptions, transporter) {
  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: true });
    }
  });
}

async function updatePoll(pollId, candidateId) {
  let votes = await Vote.find({ pollId }).count();
  let voters = await User.find({ type: "V" }).count();

  await Poll.updateOne(
    { _id: pollId, "stats.candidateId": candidateId },
    { $inc: { "stats.$.votes": 1 } }
  );

  if (votes == voters) {
    let poll = await Poll.findOne({ _id: pollId });
    let stats = poll.stats;
    let max = stats[0];
    stats.forEach((stat, index) => {
      if (stats[index].votes > stat.votes) {
        max = stats[index];
      }
    });
    await Poll.updateOne(
      { _id: pollId },
      {
        $set: {
          status: "Completed",
          completed: true,
          winner: { name: max.candidateName, id: max.candidateId },
        },
      }
    );
  }
}

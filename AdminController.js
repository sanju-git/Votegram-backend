const express = require("express");
const api = express();
api.use(express.json());
const mongoose = require("mongoose");
const Poll = mongoose.model("Poll");
const User = mongoose.model("User");
const QRCode = require("qrcode");
const nodemailer = require("nodemailer");

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
    mailVoters(poll);
    return res.status(200).json({
      success: true,
      message: "poll added",
    });
  } catch (e) {
    console.log(e);
  }
};

async function mailVoters(poll) {
  let pollId = poll._id;
  let voters = await User.find({ type: "V" });
  voters.map(async (voter) => {
    await generateQr(pollId, voter._id, voter.email);
  });
  console.log(pollId, voter);
}

async function generateQr(pollId, userId, email) {
  let url = "http://localhost:3000/" + userId + "/" + pollId;
  await QRCode.toFile(
    "/Users/sanjeev/sanjeev/Projects/votegram/Votegram/qr/" +
      userId +
      "-" +
      pollId +
      ".png",
    url
  );
  await sendMail(userId + "-" + pollId, email, url);
}

async function sendMail(fileName, email, url) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gotoosanju@gmail.com",
      pass: "g0t00sanju",
    },
  });

  let emailBody =
    '<img style="width:250px;" src="cid:unique@cid"></img><br/><span>Or use this </span><a href="' +
    url +
    '">link</a>';

  let mailOptions = {
    from: "gotoosanju@gmail.com",
    to: email,
    subject: "Poll link",
    attachments: [
      {
        filename: fileName + ".png",
        path:
          "/Users/sanjeev/sanjeev/Projects/votegram/Votegram/qr/" +
          fileName +
          ".png",
        cid: "unique@cid",
      },
    ],
    text: "Use this QR code or link to join the poll :" + url,
    html: emailBody,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: true });
    }
  });
}

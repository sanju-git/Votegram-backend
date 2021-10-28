const express = require("express");
const {
  isLoggedIn,
  isAdmin,
  isVoter,
  isAdminOrVoter,
} = require("../RequestUtils");
const router = express.Router();

const { loginUser, registerUser } = require("./../AuthController");
const { getCandidates, castVote, getPoll } = require("./../VoterController");
const {
  getAllUsers,
  createPoll,
  getAllPolls,
  // getPollStats,
} = require("./../AdminController");

// authentication
router.post("/register", registerUser);
router.post("/login", loginUser);

// admin
router.get("/get-all-users", isLoggedIn, isAdmin, getAllUsers);
router.post("/addPoll", isLoggedIn, isAdmin, createPoll);

//both
router.get("/get-all-polls", isLoggedIn, isAdminOrVoter, getAllPolls);
// router.get("/get-poll-stats/:pollId", isLoggedIn, isAdminOrVoter, getPollStats);

// voter
router.get(
  "/get-candidates/:pollId",
  isLoggedIn,
  isAdminOrVoter,
  getCandidates
);
router.get("/poll/:pollId", isLoggedIn, isAdminOrVoter, getPoll);
router.post("/cast-vote", isLoggedIn, isAdminOrVoter, castVote);

module.exports = router;

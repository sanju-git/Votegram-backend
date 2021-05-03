var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VoteSchema = mongoose.Schema({
  pollId: String,
  voterId: String,
  candidateId: String,
});

VoteSchema.path("pollId").required(true);
VoteSchema.path("voterId").required(true);
VoteSchema.path("candidateId").required(true);

mongoose.model("Vote", VoteSchema);

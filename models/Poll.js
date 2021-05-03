var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PollSchema = mongoose.Schema({
  name: String,
  candidates: [{ candidateName: String, id: String }],
  status: String,
  completed: Boolean,
  winner: { name: String, id: String },
  stats: [{ candidateId: String, candidateName: String, votes: Number }],
});
PollSchema.path("name").required(true);
// mongoose.model("Poll", PollSchema);

mongoose.model("Poll", PollSchema);

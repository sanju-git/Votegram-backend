var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
  name: String,
  rollNo: { type: String, index: { unique: true, sparse: true } },
  password: String,
  email: String,
  type: String,
  lastLoginDate: Date,
  voted: Boolean,
});

UserSchema.path("name").required(true);
// UserSchema.path("rollNo").required(true);
UserSchema.path("password").required(true);

mongoose.model("User", UserSchema);

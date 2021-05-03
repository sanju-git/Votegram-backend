var jwt = require("jsonwebtoken");
var _jwtSecret = require("./config/JWT").secret;

module.exports = {
  isLoggedIn: function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers["x-api-key"];
    if (token) {
      jwt.verify(token, _jwtSecret, function (err, decoded) {
        if (err) {
          return res.json({
            success: false,
            message: "Failed to authenticate token.",
          });
        } else {
          req.user = decoded;
          return next();
        }
      });
    } else {
      res.sendStatus(401);
    }
  },
  isAdmin: function (req, res, next) {
    var user = req.user;
    if (user.type === "A") {
      return next();
    }
    res.sendStatus(401);
  },
  isVoter: function (req, res, next) {
    var user = req.user;
    if (user.type === "V") {
      return next();
    }
    res.sendStatus(401);
  },

  isAdminOrVoter: function (req, res, next) {
    var user = req.user;
    if (user.type === "V" || user.type === "A") {
      return next();
    }
    res.sendStatus(401);
  },
};

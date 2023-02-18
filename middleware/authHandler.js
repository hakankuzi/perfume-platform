const jwt = require("jsonwebtoken");
const ApiError = require("../exception/ApiError");

const requireAuth = (req, res, next) => {
  const token = req.body.token;

  // check json web token exists & is verified
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      throw ApiError.badRequest(err.message);
    }
    req.decodedToken = decodedToken;
    next();
  });
};
module.exports = { requireAuth };

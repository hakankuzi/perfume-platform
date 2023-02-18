const { Router } = require("express");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const { requireAuth } = require("../middleware/authHandler");
const ApiError = require("../exception/ApiError");
const UserResponse = require("./dto/response/UserResponse");
const UserDetailResponse = require("./dto/response/UserDetailResponse");
const router = Router();

router.post("/me", requireAuth, async (req, res) => {
  try {
    const user = req.decodedToken.user;
    res
      .status(200)
      .json(
        new UserDetailResponse(
          user.email,
          user.isActiveEmail,
          user.isActiveUser,
          user.photoURL,
          user.savedDate
        )
      );
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
});

router.get("/user", async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.getUser(email, password);
    const token = createToken(user);
    res
      .status(200)
      .json(
        new UserResponse(user.email, user.isActiveEmail, user.photoURL, token)
      );
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
});

router.post("/user", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.createUser(email, password);
    const token = createToken(user);
    res
      .status(201)
      .json(
        new UserResponse(user.email, user.isActiveEmail, user.photoURL, token)
      );
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
});

router.put("/user", requireAuth, async (req, res, next) => {
  try {
    const user = req.body.user;
    const updatedUser = await User.updateUser(req.decodedToken.user._id, user);
    const token = createToken(updatedUser);
    res
      .status(200)
      .json(
        new UserResponse(
          updatedUser.email,
          updatedUser.isActiveEmail,
          updatedUser.photoURL,
          token
        )
      );
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
});

// createToken
const createToken = (user) => {
  try {
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
      expiresIn: 1 * 24 * 60 * 60
    });
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
};

module.exports = router;

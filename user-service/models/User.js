const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const ApiError = require("../../exception/ApiError");
const ROLES = require("../constants/Roles");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: true,
    unique: [true, "Please enter an password"],
    minlength: [6, "Minimum password length is 6 characters"]
  },
  isActiveEmail: {
    type: Boolean,
    default: false,
    required: [true, "Please choose email is active or inactive"],
    lowercase: true
  },
  savedDate: {
    type: Date,
    default: Date.now,
    required: [true, "Please define saved date"]
  },
  isActiveUser: {
    type: Boolean,
    default: true,
    required: [true, "Please choose user is active or inactive"],
    lowercase: true
  },
  photoURL: {
    type: String,
    default: "",
    required: false
  },
  uuid: {
    type: String,
    required: true,
    lowercase: true
  },
  roles: {
    type: [String],
    required: [true, "You need to define at least one role"],
    uppercase: true
  }
});

// create user
userSchema.statics.createUser = async function (email, password) {
  const salt = await bcrypt.genSalt();
  password = await bcrypt.hash(password, salt);

  let user = {
    email: email,
    password: password,
    isActiveUser: true,
    isActiveEmail: false,
    photoURL: "",
    roles: [ROLES.BASIC],
    savedDate: Date.now(),
    uuid: uuidv4()
  };

  const newUser = await User.create(user);
  return newUser;
};

// update user
userSchema.statics.updateUser = async function (_id, user) {
  const updatedUser = await this.findOneAndUpdate(_id, user, {
    upsert: true,
    new: true
  });
  return updatedUser;
};

// get user
userSchema.statics.getUser = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw ApiError.badRequest("incorrect password");
  }
  throw ApiError.badRequest("incorrect email");
};

// me
userSchema.statics.me = async function (email) {
  const user = await this.findOne({ email });
  if (user) {
    return user;
  }
  throw ApiError.badRequest("user does not exists in the system!");
};

const User = mongoose.model("user", userSchema);

module.exports = User;

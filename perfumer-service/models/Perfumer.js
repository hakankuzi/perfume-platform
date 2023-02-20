const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const ApiError = require("../../exception/ApiError");

const perfumerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter an name"],
    unique: true
  },
  surname: {
    type: String,
    required: [true, "Please enter an surname"],
    unique: true
  },
  company: {
    type: String,
    required: false,
    unique: false,
    default: ""
  },
  website: {
    type: String,
    required: false,
    unique: false,
    default: ""
  },
  workWith: {
    type: String,
    required: false,
    unique: false,
    default: ""
  },
  image: {
    type: String,
    default: "",
    unique: true,
    required: false
  },
  photoURL: {
    type: String,
    default: "",
    required: false
  },
  savedDate: {
    type: Date,
    default: Date.now,
    required: [true, "Please define saved date"]
  },
  uuid: {
    type: String,
    required: true,
    lowercase: true
  }
});

// create perfumer
perfumerSchema.statics.createPerfumer = async function (perfumer) {
  perfumer.savedDate = Date.now();
  perfumer.uuid = uuidv4();
  const newPerfumer = await this.create(perfumer);
  return newPerfumer;
};

// update perfumer
perfumerSchema.statics.updatePerfumer = async function (_id, perfumer) {
  const updatePerfumer = await this.findOneAndUpdate(_id, perfumer, {
    upsert: true,
    new: true
  });
  return updatePerfumer;
};

// get perfumer
perfumerSchema.statics.getPerfumers = async function (perfumer) {
  const response = await this.find(perfumer);
  if (response) {
    return response;
  } else {
    throw ApiError.badRequest("no exists perfumer");
  }
};

const Perfumer = mongoose.model("perfumer", perfumerSchema);

module.exports = Perfumer;

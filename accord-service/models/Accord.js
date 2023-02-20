const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const ApiError = require("../../exception/ApiError");

const accordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter an name"],
    unique: true
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

// create accord
accordSchema.statics.createAccord = async function (accord) {
  accord.savedDate = Date.now();
  accord.uuid = uuidv4();
  const newAccord = await this.create(accord);
  return newAccord;
};

// update accord
accordSchema.statics.updateAccord = async function (_id, accord) {
  const updateAccord = await this.findOneAndUpdate(_id, accord, {
    upsert: true,
    new: true
  });
  return updateAccord;
};

// get accord
accordSchema.statics.getAccords = async function (accord) {
  const response = await this.find(accord);
  if (response) {
    return response;
  } else {
    throw ApiError.badRequest("no exists accord");
  }
};

const Accord = mongoose.model("accord", accordSchema);

module.exports = Accord;

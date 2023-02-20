const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const ApiError = require("../../exception/ApiError");

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter an name"],
    unique: true
  },
  flag: {
    type: String,
    required: false,
    unique: true,
    default: ""
  },
  totalQuantity: {
    type: Number,
    unique: false,
    default: 0
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

// create country
countrySchema.statics.createCountry = async function (country) {
  country.savedDate = Date.now();
  country.uuid = uuidv4();
  const newCountry = await this.create(country);
  return newCountry;
};

// update country
countrySchema.statics.updateCountry = async function (_id, country) {
  const updateCountry = await this.findOneAndUpdate(_id, country, {
    upsert: true,
    new: true
  });
  return updateCountry;
};

// get country
countrySchema.statics.getCountries = async function (country) {
  const response = await this.find(country);
  if (response) {
    return response;
  } else {
    throw ApiError.badRequest("no exists country");
  }
};

const Country = mongoose.model("country", countrySchema);

module.exports = Country;

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const ApiError = require("../../exception/ApiError");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter an name"],
    unique: true
  },
  logo: {
    type: String,
    required: true,
    unique: true,
    default: ""
  },
  countryId: {
    type: Number,
    required: true,
    unique: false
  },
  quantity: {
    type: Number,
    unique: false,
    default: 0
  },
  website: {
    type: String,
    required: false,
    unique: false,
    default: ""
  },
  industry: {
    type: String,
    default: "",
    unique: false,
    required: false
  },
  description: {
    type: String,
    default: "",
    unique: false,
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

// create brand
brandSchema.statics.createBrand = async function (brand) {
  brand.savedDate = Date.now();
  brand.uuid = uuidv4();
  const newBrand = await this.create(brand);
  return newBrand;
};

// update brand
brandSchema.statics.updateBrand = async function (_id, brand) {
  const updateBrand = await this.findOneAndUpdate(_id, brand, {
    upsert: true,
    new: true
  });
  return updateBrand;
};

// get brand
brandSchema.statics.getBrands = async function (brand) {
  const response = await this.find(brand);
  if (response) {
    return response;
  } else {
    throw ApiError.badRequest("no exists brand");
  }
};

const Brand = mongoose.model("brand", brandSchema);

module.exports = Brand;

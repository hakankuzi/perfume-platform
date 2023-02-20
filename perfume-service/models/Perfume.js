const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const ApiError = require("../../exception/ApiError");

const perfumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter an name"],
    unique: true
  },
  brandId: {
    type: Number,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    required: true,
    unique: false
  },
  image: {
    type: String,
    unique: false,
    default: ""
  },
  perfumerId: {
    type: Number,
    required: true,
    unique: false
  },
  description: {
    type: String,
    default: "",
    unique: false,
    required: false
  },
  quote: {
    type: String,
    default: "",
    unique: false,
    required: false
  },
  accordImage: {
    type: String,
    default: "",
    unique: false,
    required: false
  },
  logo: {
    type: String,
    default: "",
    unique: false,
    required: false
  },
  industry: {
    type: String,
    default: "",
    unique: false,
    required: false
  },
  endYear: {
    type: String,
    default: "",
    unique: false,
    required: false
  },
  startYear: {
    type: String,
    default: "",
    unique: false,
    required: false
  },
  amazonLink: {
    type: String,
    default: "",
    unique: false,
    required: false
  },
  ebayLink: {
    type: String,
    default: "",
    unique: false,
    required: false
  },
  sellerLink: {
    type: String,
    default: "",
    unique: false,
    required: false
  },
  accordIds: {
    type: Array,
    default: [],
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

// create perfume
perfumeSchema.statics.createPerfume = async function (perfume) {
  perfume.savedDate = Date.now();
  perfume.uuid = uuidv4();
  const newPerfume = await this.create(perfume);
  return newPerfume;
};

// update perfume
perfumeSchema.statics.updatePerfume = async function (_id, perfume) {
  const updatePerfume = await this.findOneAndUpdate(_id, perfume, {
    upsert: true,
    new: true
  });
  return updatePerfume;
};

// get perfume
perfumeSchema.statics.getPerfumes = async function (perfume) {
  const response = await this.find(perfume);
  if (response) {
    return response;
  } else {
    throw ApiError.badRequest("no exists perfume");
  }
};

const Perfume = mongoose.model("perfume", perfumeSchema);

module.exports = Perfume;

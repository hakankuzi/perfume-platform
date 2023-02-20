const { Router } = require("express");
const Country = require("./models/Country");
const ApiError = require("../exception/ApiError");
const CountryResponse = require("../country-service/dto/CountryResponse");
const router = Router();

router.post("/country", async (req, res, next) => {
  const payload = req.body.payload;
  try {
    const country = await Country.createCountry(payload);
    res.status(201).json(new CountryResponse(country));
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
});

router.get("/country", async (req, res, next) => {
  try {
    const parameters = req.body.parameters;
    const countries = await Country.getCountries(parameters);

    let list = new Array();
    countries.forEach((country) => {
      let obj = new CountryResponse(country);
      list.push(obj);
    });
    res.status(200).json(list);
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
});

router.put("/country", async (req, res, next) => {
  try {
    const payload = req.body.payload;
    const updatedCountry = await Country.updateCountry(payload.id, payload);
    res.status(200).json(new CountryResponse(updatedCountry));
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
});

module.exports = router;

const { Router } = require("express");
const Brand = require("./models/Brand");
const ApiError = require("../exception/ApiError");
const BrandResponse = require("../brand-service/dto/BrandResponse");
const router = Router();

router.post("/brand", async (req, res, next) => {
  const payload = req.body.payload;
  try {
    const brand = await Brand.createBrand(payload);
    res.status(201).json(new BrandResponse(brand));
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
});

router.get("/brand", async (req, res, next) => {
  try {
    const parameters = req.body.parameters;
    const brands = await Brand.getBrands(parameters);

    let list = new Array();
    brands.forEach((brand) => {
      let obj = new BrandResponse(brand);
      list.push(obj);
    });
    res.status(200).json(list);
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
});

router.put("/brand", async (req, res, next) => {
  try {
    const payload = req.body.payload;
    const updatedBrand = await Brand.updateBrand(payload.id, payload);
    res.status(200).json(new BrandResponse(updatedBrand));
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
});

module.exports = router;

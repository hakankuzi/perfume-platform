const { Router } = require("express");
const Perfume = require("./models/Perfume");
const ApiError = require("../exception/ApiError");
const PerfumeResponse = require("../perfume-service/dto/PerfumeResponse");
const router = Router();

router.post("/perfume", async (req, res, next) => {
  const payload = req.body.payload;
  try {
    const perfume = await Perfume.createPerfume(payload);
    res.status(201).json(new PerfumeResponse(perfume));
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
});

router.get("/perfume", async (req, res, next) => {
  try {
    const parameters = req.body.parameters;
    const perfumes = await Perfume.getPerfumes(parameters);
    let list = new Array();
    perfumes.forEach((perfume) => {
      let obj = new PerfumeResponse(perfume);
      list.push(obj);
    });
    res.status(200).json(list);
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
});

router.put("/perfume", async (req, res, next) => {
  try {
    const payload = req.body.payload;
    const updatedPerfume = await Perfume.updatePerfume(payload.id, payload);
    res.status(200).json(new PerfumeResponse(updatedPerfume));
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
});

module.exports = router;

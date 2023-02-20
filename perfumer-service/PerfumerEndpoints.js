const { Router } = require("express");
const Perfumer = require("./models/Perfumer");
const ApiError = require("../exception/ApiError");
const PerfumerResponse = require("../perfumer-service/dto/PerfumerResponse");
const router = Router();

router.post("/perfumer", async (req, res, next) => {
  const payload = req.body.payload;
  try {
    const response = await Perfumer.createPerfumer(payload);
    res.status(201).json(new PerfumerResponse(response));
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
});

router.get("/perfumer", async (req, res, next) => {
  try {
    const parameters = req.body.parameters;
    const perfumers = await Perfumer.getPerfumers(parameters);
    let list = new Array();
    perfumers.forEach((perfumer) => {
      let obj = new PerfumerResponse(perfumer);
      list.push(obj);
    });
    res.status(200).json(list);
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
});

router.put("/perfumer", async (req, res, next) => {
  try {
    const payload = req.body.payload;
    const updatedPerfumer = await Perfumer.updatePerfumer(payload.id, payload);
    res.status(200).json(new PerfumerResponse(updatedPerfumer));
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
});

module.exports = router;

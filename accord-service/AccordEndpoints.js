const { Router } = require("express");
const Accord = require("./models/Accord");
const ApiError = require("../exception/ApiError");
const AccordResponse = require("../accord-service/dto/AccordResponse");
const router = Router();

router.post("/accord", async (req, res, next) => {
  const payload = req.body.payload;
  try {
    const accord = await Accord.createAccord(payload);
    res.status(201).json(new AccordResponse(accord));
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
});

router.get("/accord", async (req, res, next) => {
  try {
    const parameters = req.body.parameters;
    const accords = await Accord.getAccords(parameters);

    let list = new Array();
    accords.forEach((accord) => {
      let obj = new AccordResponse(accord);
      list.push(obj);
    });
    res.status(200).json(list);
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
});

router.put("/accord", async (req, res, next) => {
  try {
    const payload = req.body.payload;
    const updatedAccord = await Accord.updateAccord(payload.id, payload);
    res.status(200).json(new AccordResponse(updatedAccord));
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
});

module.exports = router;

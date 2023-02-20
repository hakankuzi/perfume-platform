const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./user-service/UserEndpoints");
const perfumerRoutes = require("./perfumer-service/PerfumerEndpoints");
const brandRoutes = require("./brand-service/BrandEndpoints");
const perfumeRoutes = require("./perfume-service/PerfumeEndpoints");
const accordRoutes = require("./accord-service/AccordEndpoints");
const countryRoutes = require("./country-service/CountryEndpoints");
const apiErrorHandler = require("./exception/ApiErrorHandler");
const app = express();
require("dotenv").config();

// middleware
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", perfumerRoutes);
app.use("/api", brandRoutes);
app.use("/api", perfumeRoutes);
app.use("/api", accordRoutes);
app.use("/api", countryRoutes);
app.use(apiErrorHandler);

app.get("/", (req, res) => res.send("Apis are ready!"));

// db connection
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

const server = app.listen(process.env.PORT || 3000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});

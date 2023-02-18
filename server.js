const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./user-service/UserEndpoints");
const apiErrorHandler = require("./exception/ApiErrorHandler");
const app = express();
require("dotenv").config();

// middleware
app.use(express.json());
app.use("/api", authRoutes);
app.use(apiErrorHandler);

// db connection
mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});

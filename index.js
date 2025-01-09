const { connectDb } = require("./config/connectDB");
const { errorHandler } = require("./middlewrare/errorHandler");
const userRoutes = require("./routes/userRoutes");

const express = require("express");

const dontenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

connectDb();
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", userRoutes);
app.use(errorHandler); // cretaed custom middleware to handle the error
app.listen(port, () => {
  console.log("PORT Listen on " + port);
});

const mongoose = require("mongoose");
// require()
const dontenv = require("dotenv").config();

const connectDb = async () => {
  try {
    // const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    const connect = await mongoose.connect("mongodb://127.0.0.1:27017/admin");
    console.log(`successfully connected DB `, connect.connection.host);
  } catch (err) {
    console.log(`DB not connected ${err}`);
    process.exit(1);
  }
};

module.exports = { connectDb };

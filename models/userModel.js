const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      require: [true, "Please add user name"],
    },
    email: {
      type: String,
      require: [true, "Please add email"], // this one pass error when user does not provide the approprite value.
      unique: [true, "Email address already exist"],
    },
    password: {
      type: String,
      require: [true, "Please add password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

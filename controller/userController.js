const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("Give reqiured values");
  }
  const userAvailable = await User.findOne({ email });

  // Hash the password and stored in the database

  const hashedPassword = await bcrypt.hash(password, 10);

  if (userAvailable) {
    res.status(401);
    throw new Error("User already registered");
  } else {
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      res.status(201).json({ _id: newUser.id, email: newUser.email });
    } else {
      res.status(400);
      throw new Error("User data us not valid");
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    res.status(400);
    throw new Error("Enter required values");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          userName: user.userName,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "1m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(400);
    throw new Error("email or password is not valid");
  }
});

const userStatus = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: "User Status" });
});

module.exports = { registerUser, loginUser, userStatus };

const express = require("express");
const {
  registerUser,
  loginUser,
  userStatus,
} = require("../controller/userController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", userStatus);

module.exports = router;

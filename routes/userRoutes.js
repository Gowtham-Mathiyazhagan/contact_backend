const express = require("express");
const {
  registerUser,
  loginUser,
  userStatus,
} = require("../controller/userController");
const { validateToken } = require("../middlewrare/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, userStatus);

module.exports = router;

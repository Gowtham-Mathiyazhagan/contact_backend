const {
  getAllContacts,
  createNewContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controller/contactsController");

const express = require("express");

const router = express.Router();

router.route("/").get(getAllContacts);

router.get("/:id", getContact);

router.post("/", createNewContact);

router.put("/:id", updateContact);

router.delete("/:id", deleteContact);

module.exports = router;

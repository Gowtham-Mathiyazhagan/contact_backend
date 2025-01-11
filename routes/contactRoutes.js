const {
  getAllContacts,
  createNewContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controller/contactsController");

const express = require("express");
const { validateToken } = require("../middlewrare/validateTokenHandler");

const router = express.Router();

router.use(validateToken);

router.route("/").get(getAllContacts);
router.get("/:id", getContact); // shortend method
router.post("/", createNewContact);
router.route("/:id").put(updateContact).delete(deleteContact); // currying method

module.exports = router;

// controller going to do the action
const asyncHandler = require("express-async-handler"); // defult middlleware without try catch block
const Contact = require("../models/contactModel");

// all contacts
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  console.log(req.user.id);

  if (!contacts) {
    res.status(500);
    throw new Error("Server not found");
  }
  res.status(200).json(contacts);
});

//create new contact
const createNewContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Give reqiuired values");
  }

  const contacts = await Contact.create({
    user_id: req.user.id,
    name,
    email,
    phone,
  });
  res.status(201).json(contacts);
});

//get a conatct with id
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  console.log(contact);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
});

//update contact
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User can't delete and update the other user details");
  }
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updateContact);
});

//delete contact
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User can't delete and update the other user details");
  }

  const deleteContact = await Contact.findByIdAndDelete(req.params.id);

  res.status(200).json(deleteContact);
  // res.status(200).json({ msg: `Delete the contact ${req.params.id}` });
});
module.exports = {
  getAllContacts,
  createNewContact,
  getContact,
  updateContact,
  deleteContact,
};

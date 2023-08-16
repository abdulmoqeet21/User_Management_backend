const mongoose = require("mongoose");

const formDataSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const groupFormDataSchema = new mongoose.Schema({
  formData: [formDataSchema],
});

module.exports = mongoose.model("UserGroup", groupFormDataSchema);

const express = require("express");
const {
  validateComplaintsRequiredFields,
} = require("../middlewares/validateRequiredFields");
const { saveComplaints } = require("../controller/complaint.controller");

const complaintRouter = express.Router();

complaintRouter.post(
  "/savecomplaints",
  validateComplaintsRequiredFields,
  saveComplaints
);

module.exports = complaintRouter;

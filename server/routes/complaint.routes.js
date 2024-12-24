const express = require("express");
const {
  validateComplaintsRequiredFields,
} = require("../middlewares/validateRequiredFields");
const {
  saveComplaints,
  fetchComplaints,
} = require("../controller/complaint.controller");

const complaintRouter = express.Router();

complaintRouter.post(
  "/savecomplaints",
  validateComplaintsRequiredFields,
  saveComplaints
);

complaintRouter.get("/getComplaints", fetchComplaints);

module.exports = complaintRouter;

const ComplaintModel = require("../model/complaint.model");

const saveComplaints = async (req, res) => {
  try {
    const { name, email, complaint } = req.body;

    const complaints = new ComplaintModel({
      name,
      email,
      complaint,
    });

    await complaints.save();

    return res
      .status(201)
      .json({ message: "complaint registered successfully", data: complaints });
  } catch (error) {
    console.log("Error on registering complaint", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  saveComplaints,
};

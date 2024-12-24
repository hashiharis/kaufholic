const validateRequiredFields = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  next();
};

const validateSellerRequiredFields = (req, res, next) => {
  const { name, email, password, contact, address, pincode, description } =
    req.body;

  if (
    !name ||
    !email ||
    !password ||
    !contact ||
    !address ||
    !pincode ||
    !description
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  next();
};

const validateComplaintsRequiredFields = (req, res, next) => {
  const { name, email, complaint } = req.body;

  if (!name || !email || !complaint) {
    return res.status(400).json({ message: "All fields are required" });
  }
  next();
};
module.exports = {
  validateRequiredFields,
  validateSellerRequiredFields,
  validateComplaintsRequiredFields,
};

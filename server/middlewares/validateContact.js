const validateContact = (req, res, next) => {
  const { contact } = req.body;
  if (contact > 9999999999 || contact < 1000000000) {
    return res
      .status(400)
      .json({ message: "Contact number should be 10 digits" });
  }

  next();
};

const validatePincode = (req, res, next) => {
  const { pincode } = req.body;

  if (pincode > 999999 || pincode < 100000) {
    return res.status(400).json({ message: "Pincode should be 6 digit" });
  }
  next();
};
module.exports = { validateContact, validatePincode };

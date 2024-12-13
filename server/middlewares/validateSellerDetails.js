const validateSellerEditFields = (req, res, next) => {
  try {
    const { name, email, contact, address, pincode, description } = req.body;

    if (!name || !email || !contact || !address || !pincode || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    next();
  } catch (error) {
    console.log("Error in seller details updation validation", error);
    return res
      .status(500)
      .json({ message: "Error in seller details updation validation" });
  }
};

module.exports = { validateSellerEditFields };

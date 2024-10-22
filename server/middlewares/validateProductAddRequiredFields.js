const validateProductAddRequiredFields = (req, res, next) => {
  const { name, category, price, description } = req.body;

  if (!name || !category || !price || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  next();
};

module.exports = { validateProductAddRequiredFields };

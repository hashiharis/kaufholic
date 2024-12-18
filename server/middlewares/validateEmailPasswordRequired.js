const validateEmailPasswordRequired = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  next();
};

const validateNameEmailRequired = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  next();
};

const validateResetPassFieldsrequired = (req, res, next) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (!email || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }
  next();
};

module.exports = {
  validateEmailPasswordRequired,
  validateNameEmailRequired,
  validateResetPassFieldsrequired,
};

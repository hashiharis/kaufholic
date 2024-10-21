const bcrypt = require("bcrypt");
let saltRounds = 10;
const validatePassword = async (req, res, next) => {
  const { password } = req.body;
  try {
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must contain atleast 8 characters" });
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.hashedPassword = hashedPassword;
    next();
  } catch (error) {
    console.log("Error in password validation", error);
    return res.status(500).json({ message: "Error on password validation" });
  }
};

module.exports = { validatePassword };

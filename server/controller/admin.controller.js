const { comparePassword } = require("../utils/comparePassword");

const adminSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminCredentials = {
      email: "admin123@gmail.com",
      password: "Admin123",
    };

    const isPasswordMatch = await comparePassword(
      adminCredentials.password,
      req.hashedPassword
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect email id or password" });
    }
    if (adminCredentials.email === email) {
      delete adminCredentials.password;
      return res.status(200).json({
        message: "Admin signed in successfully",
        data: adminCredentials,
      });
    }

    return res.status(404).json({ message: "Admin not found" });
  } catch (error) {
    console.log("Error on admin sign in", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { adminSignin };

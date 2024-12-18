const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const jwt = require("jsonwebtoken");

const protectRoute = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log("auth-header", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Authentication Failed" });
  }

  jwt.verify(token, TOKEN_SECRET_KEY, (err, data) => {
    // console.log("Error on token authetication", err);

    if (err) {
      return res.status(403).json({ message: "Authentication Failed" });
    }

    // console.log("JWT", data);
    req.buyer = data;
    next();
  });
};

module.exports = { protectRoute };

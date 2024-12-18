const jwt = require("jsonwebtoken");
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const generateAccessToken = (payload) => {
  const token = jwt.sign(payload, TOKEN_SECRET_KEY);
  // console.log("SECRETKEY", TOKEN_SECRET_KEY);
  return token;
};

module.exports = generateAccessToken;

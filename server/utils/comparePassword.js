const bcrypt = require("bcrypt");

const comparePassword = async (inputPassword, hashedPassword) => {
  if (!inputPassword || !hashedPassword) {
    return false;
  }

  const result = await bcrypt.compare(inputPassword, hashedPassword);
  console.log(result);
  return result;
};

module.exports = { comparePassword };

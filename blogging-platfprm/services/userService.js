const bcrypt = require("bcryptjs");
const User = require("../model/User");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports = { hashPassword };

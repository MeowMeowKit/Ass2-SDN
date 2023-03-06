const jwt = require("jsonwebtoken");
const SECRET = require("../constant/secret");

const secret = SECRET;
// const expiresIn = process.env.JWT_EXPIRES_IN;

function sign(payload) {
  return jwt.sign(payload, secret);
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  sign,
  verifyToken,
};
